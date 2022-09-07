import tweepy, os
# pega o token
BEARER_TOKEN = os.environ["BEARER_TOKEN"]
#inicializa o client
client = tweepy.Client(BEARER_TOKEN)
username = input("Digite o username: @")
#quantidade dentre 4 e 99
quantidade = int(input("Digite a quantidade entre 4 e 99: "))
user = client.get_user(username=username)
user_id = user.data.id
tweets = client.get_users_tweets(id=user_id, max_results=quantidade+1)
# carrega palavras a serem removidas
with open("blacklist.txt", "r") as file:
    #carrega as palavras no blacklist
    black_list = file.read().splitlines()
#tira o aviso
black_list.pop(0)
text_list = []
#coloca o texto de cada tweet tratado
for i in tweets.data:
    text = i.text
    text = text.lower()
    text_list.append(text)

word_count = dict()

for tweet in text_list:
    # tira pontos
    #deixa em minuscula e da o split
    tweet = tweet.lower()
    tweet = tweet.replace(",", "")
    tweet = tweet.replace(".", "")
    tweet = tweet.replace("!", "")
    tweet = tweet.replace(":", "")
    tweet = tweet.replace("?", "")
    words = tweet.split()
    #for word in black_list:
    #    if(words and words.count(word)):
    #       words= words.remove(word)
    for word in words:
        if len(word) > 1 and word not in black_list:
            if word_count.get(word):
                word_count[word] += 1
            else:
                word_count[word] = 1


word_count = dict(sorted(word_count.items(), key=lambda item: item[1], reverse=True))
print(word_count)
