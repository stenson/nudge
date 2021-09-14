from coldtype import *

fnt = Font.Find("IrregardlessV")

@renderable((128*2, 128*2))
def logo(r):
    return DPS([
        DP(r).f(hsl(0.7)),
        (StSt("RS", fnt, 250, wght=0.25, slnt=1, ss03=1)
            .align(r)
            .f(1))])
