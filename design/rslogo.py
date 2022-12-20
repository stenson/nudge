from coldtype import *

fnt = Font.Find("IrregardlessV")

@renderable((128*2, 128*2), bg=hsl(0.7), render_bg=1)
def logo(r):
    return (StSt("RS", fnt, 250, wght=0.25, slnt=1, ss03=1)
        .align(r)
        .f(1))
