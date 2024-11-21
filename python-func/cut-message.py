from pythainlp.tokenize import word_tokenize

def CutString(string):
    return word_tokenize(string, engine="newmm-safe")
