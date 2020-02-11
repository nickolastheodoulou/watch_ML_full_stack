from bs4 import BeautifulSoup
import requests

url = "https://www.chrono24.co.uk/rolex/index.htm?dosearch=true&query=rolex"
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:71.0) Gecko/20100101 Firefox/71.0'}
page = requests.get(url, headers=headers)  # get the request
soup = BeautifulSoup(page.content, 'html.parser')  # create the soup to scrape

mydivs = soup.findAll("div", {"class": "article-image-container"})
print(mydivs)
# mydivs = soup.findAll("div", {"class": "content"}) # need to extract the img somehow


file = open("testfile.txt", "w")

file.write(str(mydivs))

file.close()
