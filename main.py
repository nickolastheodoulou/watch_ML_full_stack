# %%

import time
from selenium import webdriver
from bs4 import BeautifulSoup
import re
import pandas as pd



def scrape__one_page_one_brand_return_df(brand, page_number):
    browser = webdriver.Chrome()
    browser.get('https://www.chrono24.co.uk/' + brand + '/index-' + page_number + '.htm?query=' + brand)

    # time in milliseconds before each scroll
    list = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000]
    for i in list:
        time.sleep(2)
        command = "window.scrollTo(0, " + str(i) + ")"

        browser.execute_script(command)  # render the entire page before passing into soup otherwise src won't appaer

    html_rendered = browser.page_source
    browser.close()  # close the browser

    soup = BeautifulSoup(html_rendered, 'html.parser')  # create the soup
    img_divs = soup.findAll("div", {"class": "article-image-container"})  # find the class which contains the imaes

    price_divs = soup.findAll("div", {"class": "article-price"})  # find the class with the prices

    list_img_url = []
    list_price = []

    for i in range(0, len(img_divs)):  # loop through the list
        img_url = img_divs[i].img['src']  # extract the 'src' from the rendered page
        # print(brand)
        list_img_url.append(img_url)

        price = price_divs[i].text
        price = price.replace(',', '')
        price = re.findall(r'\d+', price)
        list_price.append(price[0])

    df = pd.DataFrame(columns=['brand', 'img_url', 'price'])
    df = df.assign(price=list_price)
    df = df.assign(img_url=list_img_url)
    df['brand'] = brand
    return df


brand = 'rolex'
df = pd.DataFrame(columns=['brand', 'img_url', 'price'])
for i in range(1, 3):
    page_number = str(i)

    df_rolex_one = scrape__one_page_one_brand_return_df(brand, page_number)
    df = df.append(df_rolex_one, ignore_index=True)

print(df.head())
df.to_csv('test.csv')
# %%



