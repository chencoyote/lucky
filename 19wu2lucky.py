import csv

def mklucky(csvfile):
    lucky_data = []
    spamReader = csv.reader(open(csvfile, 'rb'))
    for i in spamReader:
        if spamReader.line_num == 1:
            continue
        else:
            email = i[4]
            at = email.find("@")
            if at <= 4:
                hidden = email[0] + "***" + email[at-1:at] + email[at:]
            else:
                hidden = email[0:2] + "***" + email[at-3:at] + email[at:]
            lucky_str = "%s,%s" % (i[3], hidden)
            lucky_data.append(lucky_str)
    f = open("./js/luckydata.js","w")
    db = "var data = ['%s']" % "','".join(lucky_data)
    f.write(db)
    f.close()

if __name__ == "__main__":
    import sys
    if len(sys.argv) <= 1:
       print "               *********************************************"
       print "               * 19wu2lucky.py                             *"
       print "               *                                           *"
       print "               *     -- PyCon China 2014 lucky data maker  *"
       print "               *                                           *"
       print "               * Usage: python 19wu2lucky.py 19wu_data.csv *"
       print "               *                                           *"
       print "               *                   By: chen_coyote@qq.com  *"
       print "               *********************************************"
    else:
       mklucky(sys.argv[1])
