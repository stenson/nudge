from coldtype import *

fnt = Font.Find("IrregardlessV")
fnt2 = Font.Find("CoFoPeshkaVariableV1.0")

@renderable((256, 256))
def logo(_r):
    r = Rect(1080, 1080)
    return (P(
        P().oval(r.inset(50)).f(hsl(0.4, 0.6, 0.5)),
        StSt("Nudge".upper(), fnt, 550, wght=0.75, slnt=1, ss01=1)
            .align(r)
            .pen()
            .f(1)
            .rotate(5)
            .translate(0, 30),
        StSt("+/-", fnt2, 150, wght=0.5, wdth=1)
            .align(r.take(450, "mny"))
            .f(1))
        .scale(_r.w/1080)
        .align(_r))
