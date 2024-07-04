# NÃ©cessite installation 
#   feh : sudo apt install feh -y
#   
# Inspiration projet Geektoolkit/Dynaframe
# PHM : 26/06/2024
import os
import subprocess
import time
import sys

# initial variables
imagePath = "S:\école\Sup_de_Vinci\B1\éval\HACKATHON\KUBII_Hackathon-main\KUBII_Hackathon\Slide"  # path to the current folder of images
print("Imagepath set to: " + imagePath);
refreshInterval = 10 # number of seconds between images in a slideshow

time.sleep(1)

dirs = os.listdir(imagePath)

# init...clean up any other running instances
os.system("killall -9 feh")
os.system("killall -9 vlc")

while True:
            for file in dirs:
                print ("Mainloop: Image Path is: " + imagePath + " and has: " + str(len(dirs)) + " files.")
                #file = "./" + imagePath + "/" + file
                file = imagePath + "/" + file

                print("File is: " + file)
                os.system("killall -9 feh")
                os.system("killall -9 vlc")

                if file.upper().endswith(".MOV"):
                    subprocess.Popen('cvlc --fullscreen ' + file,shell = True)
                if file.upper().endswith(".MP4"):
                    subprocess.Popen('cvlc --fullscreen ' + file,shell = True)
                if file.upper().endswith(".JPG"):
                    subprocess.Popen("DISPLAY=:0.0 feh -F --zoom fill "+ file,shell = True)
                    #os.system("DISPLAY=:0.0 feh -qF --zoom fill "+ file)
                print("Showing: " + file)
                time.sleep(refreshInterval)

