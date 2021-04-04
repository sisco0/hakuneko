from html_similarity import style_similarity, structural_similarity, similarity
import requests
import sys

def get_url(url):
  r = requests.get(url)
  return r.text

if __name__ == "__main__":
  html_1 = get_url(sys.argv[1])
  html_2 = get_url(sys.argv[2])
  print(
        style_similarity(html_1, html_2),
        structural_similarity(html_1, html_2),
        similarity(html_1, html_2))
