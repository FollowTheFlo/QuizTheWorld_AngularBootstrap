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

    def isFileValid(self):
        try:
            int(self.title.split('__')[1].split('.')[-2])
            int(self.title.split('__')[0].split('_')[-2])
            int(self.title.split('__')[0].split('_')[-1])
            #print("timestamp: "+str(timestpyo))
            return True
        except ValueError as verr:
            print("error1 - cannot be converted to an int: %s" % (verr))
            return False
        except Exception as ex:
            print("error2 - cannot be converted to an int: %s" % (ex))
            return False
            

    def getDateTime(self):
        ##get 2nd part of file name cut before extension.png and convert to number
        ##testSize_600_800__1522526944590.png to 1522526944590
        timestamp =  int(self.title.split('__')[1].split('.')[-2])
        ssDateTime = datetime.fromtimestamp(timestamp * 0.001,).strftime("%d/%m/%y %H:%M")
        return(ssDateTime)

    def getFullRelativePath(self):
        return((self.title))

    def getHTMLString(self):
        return """<p>Test Time: %s</p><p>Dimension: %s</p>
        <img src=\"%s\" alt=\"TestResult\" height=\"%s\" width=\"%s\" >""" % (self.getDateTime(),self.getDimension(),self.getFullRelativePath(),self.getHeight(),self.getWidth())


def buildPage(localList):
    ##build html with concatenation of screenshots html string and wrapped in head-body html
    htmlImgString=""
    ##concatenate string of each screenshot
    for s in localList:
        ##isFileValid() test extracted Height Witdh Timestamp are number
        if s.isFileValid() == True:           
            htmlImgString += s.getHTMLString()
        else:
            print("Not Valid string: "+s.getFullRelativePath())

    fullPage = """<html>
        <head>
        <title>Screenshots from e2e testing</title>
        </head>
        <body><h2>Selenium Screenshots</h2>%s
        </body>
        </html>""" % (htmlImgString)
    
    return fullPage


def buildFile(pageName,content):
    ##open file, fill it, close, open in tab
    #filename = pageName + '.html'

    try:
        f = open(pageName,'w')
        f.write(content)
        f.close()
    except IOError as e:
        print("I/O error({0}): {1}".format(e.errno, e.strerror))
        return False
    else: 
        return True



# lisr files of directory
path_ss = "..\screenshots/"
path_video = "..\cypress/videos/"
ssList = []
fileName = "TestResult.html"

# This would print all the files and directories

if( not os.path.exists(path_ss)):
    print("The folder does not exist")
    quit()
    
##get all png files, put in  List    
filesList = glob.glob( path_ss+"*.png" )

if len(filesList) <= 0 :
    print("No files in folder")
    quit()

for file in filesList:
    print(file)
    ##create a Screenshot object for each png file
    ssObj = ScreenShot(file,path_ss)
    ##add screenshot obj in List
    ssList.append(ssObj)



    
    
##get all png files, put in  List    

##get html page from list of screenshots obj
fullHTMLPage = buildPage(ssList)


##video, get the file and add it in html

if(os.path.exists(path_video)):
    video_fileList = glob.glob( path_video+"*.mp4" )
    if len(video_fileList) > 0:
        fullHTMLPage = fullHTMLPage.replace("<body>","<body><h2>Cypress Video Last Test:</h2><video width=\"700\" height=\"400\" controls><source src="+video_fileList[0]+" type=\"video/mp4\"></video>")
    else:
         print("no video file")
else:
     print("The video folder does not exist")

if(buildFile(fileName,fullHTMLPage)):
    ##file build success, open it in new tab
    print("To see screenshots and video, Please open: "+fileName)
    open_new_tab(fileName)
else:
    print("Error occured on Build File")
