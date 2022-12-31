import sys
import shutil
img = sys.argv[0]
try:
    shutil.copyfile("images/"+img+"", "../public/"+"C_"+img+"")
except:
    print("file save failed", )
    sys.stdout.flush()
print("file saved", img+"._C.jpg")
sys.stdout.flush()
