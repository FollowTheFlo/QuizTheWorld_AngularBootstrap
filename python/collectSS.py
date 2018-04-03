import os, sys,glob
from datetime import datetime, date, time
from webbrowser import open_new_tab

class ScreenShot:
    def __init__(self, title, path):
        self.title = title
        self.path=path
        
    def getDimension(self):
        dimension =  self.title.split('__')[0].split('_')
        return(dimension[-2] + "*" + dimension[-1])

    def getWidth(self):
        return self.title.split('__')[0].split('_')[-2]

    def getHeight(self):
        return self.title.split('__')[0].split('_')[-1]


    def getDateTime(self):
        ##get 2nd part of file name cut before extension.png and convert to number
        ##testSize_600_800__1522526944590.png to 1522526944590
         timestamp =  int(self.title.split('__')[1].split('.')[-2])
        # print("timestamp: "+ str(timestamp))
         ssDateTime = datetime.fromtimestamp(timestamp * 0.001)
         return(ssDateTime)

    def getFullRelativePath(self):
        return((self.title))

    def getHTMLString(self):
        return """<p>Timestamp: %s</p><p>Dimension: %s</p>
        <img src=\"%s\" alt=\"TestResult\" height=\"%s\" width=\"%s\" >""" % (self.getDateTime(),self.getDimension(),self.getFullRelativePath(),self.getHeight(),self.getWidth())






def buildPage():
    htmlImgString=""
    ##concatenate string of each screenshot
    for s in ssList:
         htmlImgString += s.getHTMLString()

    fullPage = """<html>
        <head>
        <title>Screenshots from e2e testing</title>
        </head>
        <body>%s
        </body>
        </html>""" % (htmlImgString)
    
    return fullPage


def displayPage(pageName):
    ##open file, fill it, close, open in tab
    filename = pageName + '.html'
    f = open(filename,'w')
    f.write(buildPage())
    f.close()
    open_new_tab(filename)



# lisr files of directory
path = "..\screenshots/"
dirs = glob.glob( path+"*.png" )
ssList = []

# This would print all the files and directories
for file in dirs:
    print(file)
    ssObj = ScreenShot(file,path)
    ssList.append(ssObj)


    #s.getDimension()
    #s.getFullRelativePath()
displayPage("FloFile")