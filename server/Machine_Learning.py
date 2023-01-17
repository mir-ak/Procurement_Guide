import numpy as np
import pandas as pd
import nltk  
#nltk.download()
from nltk.corpus import stopwords
from sklearn.svm import SVC
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.model_selection import train_test_split
from joblib import dump, load

import pickle 
import dill as pickle
from firebase import firebase


# connexion a la base de donnée (firebase) 
def configData():
  fb_app = firebase.FirebaseApplication('https://portfolioweb-3106e-default-rtdb.europe-west1.firebasedatabase.app', None)
  return fb_app 
# verifier si le commentaire existe deja    
def checkString(coments):
  coments_exist=[]
  with open('dataset.txt') as file_object:
    datafile = file_object.readlines()
    for line in range(len(datafile)):
      coments_exist.append(datafile[line]) 
  file_object = open('dataset.txt', 'a')  
  for item in coments:
    if item not in coments_exist:  
      file_object.write(item)
# ajouter le commentaire a DataSet.txt s'il existe pas      
def addComentsToDataset():
  coments = []
  fb_app = configData()
  result = fb_app.get('comments/',None)
  #print(result)
  for id in result:
    if id == None:
      continue
    for id_comment in result[id]:
      coments.append(id_comment+";"+result[id][id_comment]['commentaire']+";"+result[id][id_comment]['predire']+"\n")
  checkString(coments)

def traitement_text(avis, lema = True) :
  lemmatizer = WordNetLemmatizer()
  stopWords = stopwords.words('english')
  contractions_courantes = {"ain't": "am not","aren't": "are not","can't": "cannot","can't've": "cannot have","'cause": "because","could've": "could have","couldn't": "could not","couldn't've": "could not have","didn't": "did not","doesn't": "does not","don't": "do not","hadn't": "had not","hadn't've": "had not have","hasn't": "has not","haven't": "have not","he'd": "he would","he'd've": "he would have","he'll": "he will","he'll've": "he will have","he's": "he is","how'd": "how did","how'd'y": "how do you","how'll": "how will","how's": "how is","I'd": "I would","I'd've": "I would have","I'll": "I will","I'll've": "I will have","I'm": "I am","I've": "I have","isn't": "is not","it'd": "it had","it'd've": "it would have","it'll": "it will","it'll've": "it will have","it's": "it is","let's": "let us","ma'am": "madam","mayn't": "may not","might've": "might have","mightn't": "might not","mightn't've": "might not have","must've": "must have","mustn't": "must not","mustn't've": "must not have","needn't": "need not","needn't've": "need not have","o'clock": "of the clock","oughtn't": "ought not","oughtn't've": "ought not have","shan't": "shall not","sha'n't": "shall not","shan't've": "shall not have","she'd": "she would","she'd've": "she would have","she'll": "she will","she'll've": "she will have","she's": "she is","should've": "should have","shouldn't": "should not","shouldn't've": "should not have","so've": "so have","so's": "so is","that'd": "that would","that'd've": "that would have","that's": "that is","there'd": "there had","there'd've": "there would have","there's": "there is","they'd": "they would","they'd've": "they would have","they'll": "they will","they'll've": "they will have","they're": "they are","they've": "they have","to've": "to have","wasn't": "was not","we'd": "we had","we'd've": "we would have","we'll": "we will","we'll've": "we will have","we're": "we are","we've": "we have","weren't": "were not","what'll": "what will","what'll've": "what will have","what're": "what are","what's": "what is","what've": "what have","when's": "when is","when've": "when have","where'd": "where did","where's": "where is","where've": "where have","who'll": "who will","who'll've": "who will have","who's": "who is","who've": "who have","why's": "why is","why've": "why have","will've": "will have","won't": "will not","won't've": "will not have","would've": "would have","wouldn't": "would not","wouldn't've": "would not have","y'all": "you all","y'alls": "you alls","y'all'd": "you all would","y'all'd've": "you all would have","y'all're": "you all are","y'all've": "you all have","you'd": "you had","you'd've": "you would have","you'll": "you you will","you'll've": "you you will have","you're": "you are","you've": "you have"}
  avis = avis.lower()
  avis = " ".join([contractions_courantes[mot] if mot in contractions_courantes else mot for mot in avis.split(" ")])
  avis = " ".join([lemmatizer.lemmatize(mot) for mot in avis.split(" ") if  mot not in stopWords and mot.isalpha()]) 
  avis = word_tokenize(avis) 
  return avis

def notreModel(IsOk):
  addComentsToDataset()
  with open('dataset.txt') as f:
    data = pd.read_csv(f,sep=";")
  df = pd.DataFrame(data)
  # remove 
  df = df.dropna()
  #encode targat negatif ou positif  0 1 
  sentimentCoding = LabelEncoder()
  df['sentiment'] = sentimentCoding.fit_transform(df['sentiment'])
  # application des opiration de prétraitement sur les donneés de review
  df['review']=df['review'].apply(traitement_text, lema = True)
  # render le text en num 
  count_vect = CountVectorizer(tokenizer=lambda doc: doc, lowercase=False)
  # count words 
  X = count_vect.fit_transform(df['review'])
  tf = TfidfTransformer()
  # calcule le poid 
  x = tf.fit_transform(X)
  # targat 
  y = df['sentiment']


  x_train, x_test, y_train, y_test = train_test_split(x, y, train_size=0.75)

  model = SVC(C=10, decision_function_shape='ovo', gamma='scale')
  model_final = model.fit(x_train, y_train)
  # save the vectorizer
  vec_file = 'vectorizer.pickle'
  pickle.dump(count_vect, open(vec_file, 'wb'))
  # save the transformer
  tf_file = 'tf_transformer.pickle'
  pickle.dump(tf, open(tf_file, 'wb'))
  # save the sentiment encoding 
  sent_code_file = 'sent_code.pickle'
  pickle.dump(sentimentCoding, open(sent_code_file, 'wb'))

  # Save the model
  mod_file = 'classification.model'
  pickle.dump(model_final, open(mod_file, 'wb'))
  return IsOk

def classify(avis):
  # load the vectorizer
  loaded_vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))

  # load the model
  loaded_model = pickle.load(open('classification.model', 'rb'))
  # load the transformer
  tf = pickle.load(open('tf_transformer.pickle', 'rb'))
  # load the sentiment encoding 
  sentimentCoding = pickle.load(open('sent_code.pickle', 'rb'))
  
  avis = traitement_text(avis, lema = True)
  X = loaded_vectorizer.transform([avis])[0]
  x = tf.transform(X)
  return sentimentCoding.inverse_transform(loaded_model.predict(x))

##notreModel('ok')

#pour creer le model (cette fonction on l'appelle une seule fois )
#notreModel()


#pour tester ou classifier il faut utiliser la fonction classify 
#print(classify('Very soft and comfortable and warmer than it looks...fit the full size bed perfectly...would recommend to anyone looking for this type of quilt'))
