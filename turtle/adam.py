import turtle

screen = turtle.Screen()
screen.setup(width=800, height=600)
screen.bgcolor("white")
screen.title("Huis project")

t = turtle.Turtle()
t.speed(3)
t.pensize(3)

# beginpositie
t.penup()
t.goto(-100, -100)
t.pendown()

# basis van het huis
for i in range(2):
    t.forward(200)
    t.left(90)
    t.forward(120)
    t.left(90)

# dak
t.penup()
t.goto(-100, 20)
t.pendown()
t.goto(0, 100)
t.goto(100, 20)

turtle.done()