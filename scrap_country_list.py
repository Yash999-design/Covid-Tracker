from cmath import log
from bs4 import BeautifulSoup
import requests
import re

html_text = requests.get("https://www.worldometers.info/geography/how-many-countries-are-there-in-the-world/").text

# print(html_text)
soup = BeautifulSoup(html_text, "lxml")
countries = soup.find_all("td")
# for i in countries:
#   print("New Country")
#   print(i)
#   print("\n")

# print(countries.a["href"])

arr = []

def string_converter(value):
  return str(value)

for link in soup.find_all("a", attrs={"href": re.compile("^/world-population/")}):
  # print(link.text, end=",")
  arr.append(link.text)

# print(arr)


from datetime import date, timedelta

start_date = date(2019, 1, 1)
end_date = date(2020, 1, 1)
delta = timedelta(days=1)
while start_date <= end_date:
    print(start_date.strftime("%Y-%m-%d"))
    start_date += delta
print(timedelta())