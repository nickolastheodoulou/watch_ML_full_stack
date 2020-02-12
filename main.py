import time
from selenium import webdriver
from bs4 import BeautifulSoup
import re

brand = 'rolex'

browser = webdriver.Chrome()
browser.get('https://www.chrono24.co.uk/' + brand + '/index.htm?dosearch=true&query=' + brand)

# time in milliseconds before each scroll
list = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000]
for i in list:
    time.sleep(0.5)
    command = "window.scrollTo(0, " + str(i) + ")"

    browser.execute_script(command)  # render the entire page before passing into soup otherwise src won't appaer

html_rendered = browser.page_source
browser.close()  # close the browser

soup = BeautifulSoup(html_rendered, 'html.parser')  # create the soup
img_divs = soup.findAll("div", {"class": "article-image-container"})  # find the class which contains the imaes

price_divs = soup.findAll("div", {"class": "article-price"})  # find the class with the prices

for i in range(0, len(img_divs)):  # loop through the list
    content = img_divs[i].img['src']  # extract the 'src' from the rendered page
    print('brand = ' + brand)
    print(content)

    price = price_divs[i].text
    price = price.replace(',', '')
    price = re.findall(r'\d+', price)
    print(price[0])
