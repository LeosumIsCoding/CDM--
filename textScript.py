
import json
import linecache
from math import fabs

file = "lizi.txt"

data = {}
def searchJies(i):
    i = i
    jies = []
    while(1):
        
        text = linecache.getline(file, i)
        
        if "第" in text and "节" in text:
            i = i + 2

            i, fangjies = searchFangJies(i)

            text = text.replace("\n", "")
            jie = {
                "jie":text,
                "lizi":fangjies
            }
            jies.append(jie)
        else:
            return i, jies

    

def searchFangJies(i):
    i = i
    fangjies = []
    while(1):
        
        text = linecache.getline(file, i)

        if "例" in text :
            i = i + 2

            text = text.replace("\n", "")
            fangjies.append(text)
        else:
            return i, fangjies
flag = 1
while flag == 1:
    data = []
    i = 1
    while(1):
        
        text = linecache.getline(file, i)
        if "章" in text and "第" in text:
            i = i + 2
            i, jies = searchJies(i)

            text = text.replace("\n", "")
            zhang = {
                "zhang": text,
                "jies":jies
            }
            data.append(zhang)
        else:
            # print(json.dumps(data,ensure_ascii=False))

            print(data)
            print(i)
            flag = 0
            break
