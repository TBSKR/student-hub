import turtle

screen = turtle.Screen()
screen.setup(width=800, height=600)
screen.bgcolor("lightblue")
screen.title("Huis project")

t = turtle.Turtle()
t.speed(3)
t.pensize(3)

# basis van het huis
t.penup()
t.goto(-100, -100)
t.pendown()
t.fillcolor("lightyellow")
t.begin_fill()
for i in range(2):
    t.forward(200)
    t.left(90)
    t.forward(120)
    t.left(90)
t.end_fill()

# dak
t.penup()
t.goto(-100, 20)
t.pendown()
t.fillcolor("red")
t.begin_fill()
t.goto(0, 100)
t.goto(100, 20)
t.goto(-100, 20)
t.end_fill()

# deur
t.penup()
t.goto(-20, -100)
t.pendown()
t.fillcolor("brown")
t.begin_fill()
for i in range(2):
    t.forward(40)
    t.left(90)
    t.forward(70)
    t.left(90)
t.end_fill()

# linker raam
t.penup()
t.goto(-75, -20)
t.pendown()
t.fillcolor("white")
t.begin_fill()
for i in range(4):
    t.forward(30)
    t.left(90)
t.end_fill()

# rechter raam
t.penup()
t.goto(45, -20)
t.pendown()
t.fillcolor("white")
t.begin_fill()
for i in range(4):
    t.forward(30)
    t.left(90)
t.end_fill()

turtle.done()
