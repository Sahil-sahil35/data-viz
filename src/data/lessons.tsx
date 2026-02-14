import React from 'react';
import {
    BookOpen,
    BarChart3,
    LineChart,
    PieChart,
    ScatterChart,
    Grid,
    Trophy,
    Terminal,
    Calculator,
    GitBranch,
    List,
    Target
} from 'lucide-react';

export interface Lesson {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    content: {
        concept: string;
        whenToUse: string;
        syntax: string;
        codeExample: string;
        practice: {
            task: string;
            hints: string[];
            starterCode: string;
        };
        miniChallenge?: {
            title: string;
            description: string;
            expectedOutput: string;
            starterCode: string;
        };
    };
}

export const lessons: Lesson[] = [
    // --- Python Basics ---
    {
        id: 'python-basics-1',
        title: '1. Hello Python',
        icon: <Terminal className="w-4 h-4" />,
        description: 'Your first step into coding',
        content: {
            concept: `**Welcome to the world of Python!** 🐍
      
Python is popular because it's designed to be readable—almost like English. 

The most fundamental tool in our toolkit is the \`print()\` function. Think of it as your program's way of talking to you.

- **What does it do?** It takes whatever you put inside the parentheses and displays it on the screen.
- **Why lines?** Programmers call text "strings" because they are a string of characters. We wrap them in quotes \`"like this"\` so Python knows it's text, not code.`,
            whenToUse: `Use \`print()\` whenever you want to see the result of your code or leave a message for the user.`,
            syntax: `print("Hello World")
print(5 + 10)`,
            codeExample: `# This is a comment. Python ignores it.
# Let's print some text
print("Hello, Data Science!")

# We can print numbers too
print(2024)

# We can do math inside print
print(10 + 5)`,
            practice: {
                task: 'Print the message "I love Python" and then print the result of 100 * 2.',
                hints: [
                    'Use print("...") for text',
                    'Use * for multiplication'
                ],
                starterCode: `# Write you code below
print("...")
`
            },
            miniChallenge: {
                title: 'The Silenct Echo',
                description: 'Write a program that prints "..." (three dots), then waits (simulated by print nothing), then prints "Running...".',
                expectedOutput: '...\nRunning...',
                starterCode: '# Shhh...\n'
            }
        }
    },
    {
        id: 'python-basics-2',
        title: '2. Variables & Math',
        icon: <Calculator className="w-4 h-4" />,
        description: 'Storing and calculating data',
        content: {
            concept: `**Think of variables as labeled boxes.** 📦

Instead of memorizing that "The user's score is 10", we create a box labeled \`score\` and put \`10\` inside it. Whenever we need that number, we just ask for \`score\`.

**Math works just like a calculator:**
- \`+\` to add
- \`-\` to subtract
- \`*\` to multiply (we use the asterisk)
- \`/\` to divide

We can even do math *with* our boxes: \`total = price + tax\`.`,
            whenToUse: `Use variables to save numbers or text that you want to use more than once.`,
            syntax: `x = 10
y = 5
total = x + y
print(total)`,
            codeExample: `# Let's create some variables
apples = 5
oranges = 3

# We can add them
total_fruit = apples + oranges
print("Total fruit:", total_fruit)

# We can change variables
price_per_fruit = 2.5
total_cost = total_fruit * price_per_fruit
print("Total cost:", total_cost)`,
            practice: {
                task: 'Calculate the area of a rectangle with width=10 and height=5. Store them in variables and print the result.',
                hints: [
                    'Area = width * height',
                    'Create a variable called area'
                ],
                starterCode: `# Calculate the area
width = 10
height = 5

# TODO: Create a variable 'area' (width times height)
# area = ...

# TODO: Print the area
`
            },
            miniChallenge: {
                title: 'Seconds in a Day',
                description: 'Calculate and print the number of seconds in a day (24 hours). Use variables for hours, minutes, and seconds.',
                expectedOutput: '86400',
                starterCode: 'hours = 24\n'
            }
        }
    },
    {
        id: 'python-basics-3',
        title: '3. Making Decisions',
        icon: <GitBranch className="w-4 h-4" />,
        description: 'If, Else, and logic',
        content: {
            concept: `**Code isn't just a straight line; it's a branching path.** 🌳

We use \`if\` statements to let our code make decisions based on data. It's like a bouncer at a club checking IDs.

- **The Check**: \`if age >= 18:\` (Is the variable 'age' at least 18?)
- **The Result**: If yes, do the code indented underneath.
- **The Backup**: \`else:\` (Otherwise, do this instead).

**Comparison Operators:**
- \`==\` (Are these equal?)
- \`!=\` (Are these different?)
- \`>\`, \`<\` (Greater/Less than)`,
            whenToUse: `Use this logic when your code needs to react differently to different data (e.g., "If score > 50, you pass").`,
            syntax: `if score > 50:
    print("Pass")
else:
    print("Fail")`,
            codeExample: `temperature = 25

if temperature > 30:
    print("It is hot!")
elif temperature > 20:
    print("It is nice.")
else:
    print("It is cold.")

# Checking equality
my_name = "Alice"
if my_name == "Alice":
    print("Hello Alice!")`,
            practice: {
                task: 'Create a variable `age`. If age is 18 or more, print "Adult". Otherwise, print "Not yet".',
                hints: [
                    'Use >= for "greater than or equal"',
                    'Don\'t forget the colon (:)'
                ],
                starterCode: `age = 16

# TODO: Check if age is >= 18
if age ... :
    print("...")
else:
    print("...")
`
            },
            miniChallenge: {
                title: 'Even or Odd?',
                description: 'Given a variable `number = 42`, write an if/else statement to print "Even" if it is even, and "Odd" if it is odd.',
                expectedOutput: 'Even',
                starterCode: 'number = 42\n'
            }
        }
    },
    {
        id: 'python-basics-4',
        title: '4. Lists & Loops',
        icon: <List className="w-4 h-4" />,
        description: 'Handling many items at once',
        content: {
            concept: `**Imagine a shopping list.** 📝

You wouldn't create a separate piece of paper for every item ("Item1: Milk", "Item2: Eggs"). You'd put them on *one* list.

In Python, a **List** holds many items in one variable: \`prices = [5, 10, 15]\`.

**Loops** allow us to do the same task for every item on that list.
"For every price in the list prices, print it out."
This is 1000x faster than writing print 1000 times!`,
            whenToUse: `Use lists when you have many of the same thing (like a list of student grades). Use loops to process them all.`,
            syntax: `# A list
fruits = ["apple", "banana", "cherry"]

# A loop
for fruit in fruits:
    print(fruit)`,
            codeExample: `# A list of numbers
scores = [10, 20, 30, 40, 50]

print("My scores:", scores)

# Let's add them up using a loop
total = 0
for s in scores:
    total = total + s
    print("Adding:", s)

print("Final Total:", total)`,
            practice: {
                task: 'Create a list called `prices` with [5, 10, 15]. Use a for loop to double each price and print it.',
                hints: [
                    'for p in prices:',
                    'print(p * 2)'
                ],
                starterCode: `# Your code here
prices = [5, 10, 15]

# TODO: Loop through prices and print double the value
for ...
`
            },
            miniChallenge: {
                title: 'The Sum Machine',
                description: 'Calculate the sum of all numbers in the list `[10, 20, 30, 40]` using a loop and print the total.',
                expectedOutput: '100',
                starterCode: 'nums = [10, 20, 30, 40]\n\n'
            }
        }
    },

    // --- Visualization Lessons ---
    {
        id: 'viz-intro',
        title: '5. Intro to Visuals',
        icon: <BookOpen className="w-4 h-4" />,
        description: 'Drawing basic lines',
        content: {
            concept: `**"A picture is worth a thousand numbers."** 📊

Numbers are hard to read. Lines and shapes are easy.
We use a library called **Matplotlib** to draw.

**The Recipe:**
1.  \`plt.figure()\`: Get a blank piece of paper (canvas).
2.  \`plt.plot()\`: Draw your lines on it.
3.  \`plt.show()\`: Hold it up for everyone to see.`,
            whenToUse: `Use this to visualize a simple list of numbers.`,
            syntax: `import matplotlib.pyplot as plt
plt.plot([1, 2, 3])
plt.show()`,
            codeExample: `import matplotlib.pyplot as plt

# Here is our data (a list!)
prices = [100, 105, 110, 108, 115]
days = [1, 2, 3, 4, 5]

plt.figure(figsize=(6, 4))

# Plot 'days' on X axis, 'prices' on Y axis
plt.plot(days, prices)

plt.title("Stock Price")
plt.xlabel("Day")
plt.ylabel("Price ($)")
plt.show()`,
            practice: {
                task: 'Plot a list of values [2, 4, 6, 8] against [1, 2, 3, 4]. Give it a title "Growth".',
                hints: [
                    'plt.plot(x, y)',
                    'plt.title("...")'
                ],
                starterCode: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [2, 4, 6, 8]

plt.figure(figsize=(6, 4))

# TODO: Plot x vs y 


# TODO: Add title


plt.show()`
            },
            miniChallenge: {
                title: 'The Sine Wave',
                description: 'Recreate a simple "V" shape. Plot the points (0,0), (1, -1), and (2, 0).',
                expectedOutput: 'A V-Shaped line plot.',
                starterCode: 'import matplotlib.pyplot as plt\n\n'
            }
        }
    },
    {
        id: 'scatter-plots',
        title: '6. Scatter Plots',
        icon: <ScatterChart className="w-4 h-4" />,
        description: 'X vs Y Relationships',
        content: {
            concept: `**Does X cause Y?** 🤔

Scatter plots are the detective's best friend. They show the **relationship** between two things.

- **Correlation**: Do the dots form a line?
- **Positive**: As X goes up, Y goes up (Study time vs Grades).
- **Negative**: As X goes up, Y goes down (Video games vs Grades).
- **None**: A random cloud of dots (Shoe size vs IQ).`,
            whenToUse: `Use scatter plots when comparing two different numbers (like Length vs Width).`,
            syntax: `plt.scatter(x_data, y_data)
plt.show()`,
            codeExample: `import matplotlib.pyplot as plt
import pandas as pd

# Load the iris flower dataset
df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# Compare sepal length vs sepal width
plt.scatter(x=df['sepal_length'], y=df['sepal_width'])

plt.title('Sepal Dimensions')
plt.xlabel('Length')
plt.ylabel('Width')
plt.show()`,
            practice: {
                task: 'Create a scatter plot comparing petal_length (x) vs petal_width (y).',
                hints: [
                    'Use df[\'petal_length\'] and df[\'petal_width\']'
                ],
                starterCode: `import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# TODO: Plot petal_length vs petal_width


plt.show()`
            },
            miniChallenge: {
                title: 'Random Noise',
                description: 'Create two lists of 5 random numbers each (manually typed is fine). Plot them as a Scatter Plot with red dots.',
                expectedOutput: '5 red scattered dots.',
                starterCode: 'import matplotlib.pyplot as plt\n\nx = [1, 3, 2, 5, 4]\n'
            }
        }
    },
    {
        id: 'histograms',
        title: '7. Histograms',
        icon: <BarChart3 className="w-4 h-4" />,
        description: 'Distribution of one variable',
        content: {
            concept: `**What is "Normal"?** 🔔

Histograms don't show specific items; they show **The Crowd**.

- Imagine looking at the height of 100 people.
- Most will be average (tallest bar in the middle).
- A few will be very short or very tall (smaller bars on the sides).

"Bins" are just the buckets we count things into (e.g., "People between 5'0 and 5'2").`,
            whenToUse: `Use histograms to see the distribution of a single numerical variable.`,
            syntax: `sns.histplot(data=df, x='column_name')
plt.show()`,
            codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# Show distribution of sepal_length
sns.histplot(data=df, x='sepal_length', bins=10)

plt.title('Distribution of Sepal Length')
plt.show()`,
            practice: {
                task: 'Create a histogram for "petal_width" with 15 bins.',
                hints: [
                    'Change x to "petal_width"',
                    'Set bins=15'
                ],
                starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# TODO: Create histogram for petal_width
sns.histplot(...)

plt.show()`
            },
            miniChallenge: {
                title: 'Sepal Width Distribution',
                description: 'Create a histogram for `sepal_width` with exactly 5 bins.',
                expectedOutput: 'A histogram with 5 wide bars.',
                starterCode: 'import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame(iris_data)\n\n'
            }
        }
    },
    {
        id: 'bar-charts',
        title: '8. Bar Charts',
        icon: <BarChart3 className="w-4 h-4" />,
        description: 'Counting categories',
        content: {
            concept: `**The Vote Counter.** 🗳️

Bar charts answer: **"Who has the most?"**

Unlike histograms (which measure numbers), Bar charts count *Groups*.
- "How many Cats vs Dogs?"
- "Sales of iPhone vs Android?"

We use \`sns.countplot\` because it does the boring work of counting usually done in Excel for us!`,
            whenToUse: `Use bar charts to compare counts of different groups.`,
            syntax: `sns.countplot(data=df, x='category_column')
plt.show()`,
            codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# Count how many of each species there are
sns.countplot(data=df, x='species')

plt.title('Count of Each Species')
plt.show()`,
            practice: {
                task: 'Create a bar chart. Try flipping it to horizontal by using y="species" instead of x.',
                hints: [
                    'Use y="species" in sns.countplot'
                ],
                starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# TODO: Create horizontal bar chart
sns.countplot(...)

plt.show()`
            },
            miniChallenge: {
                title: 'Data Distortion',
                description: 'Count the species again, but this time apply a "Blues" palette.',
                expectedOutput: 'The same 3 bars, but in shades of blue.',
                starterCode: 'import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame(iris_data)\n\n'
            }
        }
    },
    {
        id: 'box-plots',
        title: '9. Box Plots',
        icon: <BarChart3 className="w-4 h-4" />,
        description: 'Comparing Groups',
        content: {
            concept: `**The Summary Helper.** 📦

A Box Plot summarizes a huge list of numbers into 5 little lines.
It's perfect for comparing strict groups side-by-side.

**How to read it:**
- **Middle Line**: The Median (The exact middle person).
- **The Box**: The "Normal" 50% of people.
- **The Whiskers (Lines)**: The range of "typical" data.
- **Dots**: Outliers (The weird executions, anomalies).`,
            whenToUse: `Use box plots to compare a category (Species) with a number (Petal Length).`,
            syntax: `import seaborn as sns
sns.boxplot(x='category', y='number', data=df)
plt.show()`,
            codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# Compare sepal_length across the 3 species
sns.boxplot(x='species', y='sepal_length', data=df)

plt.title('Sepal Length by Species')
plt.show()`,
            practice: {
                task: 'Create a box plot for "petal_length" by "species".',
                hints: [
                    'Change y to "petal_length"'
                ],
                starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# TODO: Create box plot for petal_length


plt.show()`
            },
            miniChallenge: {
                title: 'The Outlier Hunt',
                description: 'Create a boxplot of `sepal_width` across species. One species has visible outliers (dots). Identify it by looking at the plot.',
                expectedOutput: 'A box plot showing outliers for Setosa.',
                starterCode: 'import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame(iris_data)\n\n'
            }
        }
    },
    {
        id: 'violin-plots',
        title: '10. Violin Plots',
        icon: <BarChart3 className="w-4 h-4" />,
        description: 'Box plot + Histogram',
        content: {
            concept: `**The Best of Both Worlds.** 🎻

A Violin Plot is a mashup of a Box Plot and a Histogram.
- It shows the **Median** (white dot).
- It shows the **Box** (thick bar).
- But it *also* shows the **Shape** (the curvy slides).

**Why use it?** 
A Box Plot might hide that a group has two "peaks" (bimodal). A violin plot reveals the full shape.`,
            whenToUse: `Use violin plots when you want to compare distributions and see the "shape" of the data.`,
            syntax: `sns.violinplot(data=df, x='category', y='number')
plt.show()`,
            codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# Compare sepal_width across species
sns.violinplot(data=df, x='species', y='sepal_width')

plt.title('Sepal Width Density by Species')
plt.show()`,
            practice: {
                task: 'Create a violin plot for "petal_width" by "species".',
                hints: [
                    'Change y to "petal_width"'
                ],
                starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

plt.figure(figsize=(6, 4))

# TODO: Create violin plot for petal_width
sns.violinplot(...)

plt.show()`
            },
            miniChallenge: {
                title: 'The Mirror Image',
                description: 'Create a violin plot for `sepal_length` by `species`, but make it horizontal (violins laying down).',
                expectedOutput: 'Horizontal violin plots.',
                starterCode: 'import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame(iris_data)\n\n'
            }
        }
    },
    {
        id: 'heatmaps',
        title: '11. Heatmaps',
        icon: <Grid className="w-4 h-4" />,
        description: 'Color-coded Data',
        content: {
            concept: `**Visualizing Relationships.** 🔥

A Heatmap turns a table of boring numbers into colors.
It's most famous use is the **Correlation Matrix**:
- **Red (1.0)**: Perfect friends. As one goes up, the other goes up.
- **Blue (-1.0)**: Enemies. As one goes up, the other goes down.
- **White (0.0)**: Strangers. No relationship.

It's the fastest way to see "What matters?" in a new dataset.`,
            whenToUse: `Use heatmaps to view a correlation matrix.`,
            syntax: `sns.heatmap(data.corr(), annot=True)
plt.show()`,
            codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

# Remove the text column so we can calculate correlation
numbers = df.drop('species', axis=1)
corr = numbers.corr()

plt.figure(figsize=(6, 5))

# Draw heatmap
sns.heatmap(corr, annot=True, cmap='coolwarm')

plt.title('Correlation Matrix')
plt.show()`,
            practice: {
                task: 'Create a heatmap using the "viridis" color map.',
                hints: [
                    'Add cmap="viridis" to the heatmap function'
                ],
                starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)
numbers = df.drop('species', axis=1)
corr = numbers.corr()

plt.figure(figsize=(6, 5))

# TODO: Create heatmap with cmap='viridis'


plt.show()`
            },
            miniChallenge: {
                title: 'Spot the Strongest',
                description: 'Generate the correlation matrix heatmap. Which two *different* variables have the highest positive correlation (reddest square)?',
                expectedOutput: 'Petal Length and Petal Width (0.96)',
                starterCode: 'import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame(iris_data)\n\n'
            }
        }
    },
    {
        id: 'pair-plots',
        title: '12. Pair Plots',
        icon: <PieChart className="w-4 h-4" />,
        description: 'The Overview',
        content: {
            concept: `**The "Bird's Eye" View.** 🦅

Imagine trying every combination of charts. That would take forever.
**Pair Plot** does it for you in one line of code.

It creates a grid:
- **Diagonals**: Histograms (Distribution of that single variable).
- **Others**: Scatter Plots (Relationship between two variables).

It is the **first thing** you should run on a new dataset.`,
            whenToUse: `Use at the start of analysis to find interesting patterns quickly.`,
            syntax: `sns.pairplot(df, hue='category')`,
            codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

# hue='species' means "color the dots by species"
sns.pairplot(df, hue='species', height=2.0)

plt.show()`,
            practice: {
                task: 'Run the pairplot. Which measurement separates the species best?',
                hints: [
                    'Look for charts where the colors are completely separated.'
                ],
                starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)

# TODO: Run pairplot
sns.pairplot(df, hue='species', height=2.0)

plt.show()`
            },
            miniChallenge: {
                title: 'Subset Pairplot',
                description: 'Create a pairplot, but ONLY include `sepal_length` and `petal_length`.',
                expectedOutput: 'A 2x2 grid of plots.',
                starterCode: 'import seaborn as sns\nimport pandas as pd\ndf = pd.DataFrame(iris_data)\n\n'
            }
        }
    },

    // --- Challenges ---
    {
        id: '3d-scatter-plots',
        title: '13. 3D Scatter Plots',
        icon: <ScatterChart className="w-4 h-4" />,
        description: 'Three dimensions',
        content: {
            concept: `**Entering the 3rd Dimension.** 🧊

Sometimes 2 variables (X, Y) aren't enough. We need Z!
A 3D scatter plot places dots in a cube.

**The Setup:**
1.  Import \`Axes3D\` (The 3D toolkit).
2.  Tell matplotlib: \`projection='3d'\`.
3.  Give it 3 lists: \`xs, ys, zs\`.

*Note: These are cool, but can be hard to read on paper. Use them sparingly!*`,
            whenToUse: `Use when you want to see the relationship between three numerical variables.`,
            syntax: `ax = plt.figure().add_subplot(projection='3d')
ax.scatter(x, y, z)`,
            codeExample: `import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import pandas as pd

df = pd.DataFrame(iris_data)

fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')

# Plot 3 different columns
ax.scatter(df['sepal_length'], df['sepal_width'], df['petal_length'], c='blue', marker='o')

ax.set_xlabel('Sepal Length')
ax.set_ylabel('Sepal Width')
ax.set_zlabel('Petal Length')

plt.show()`,
            practice: {
                task: 'Create a 3D scatter plot using sepal_length, sepal_width, and petal_width (as Z).',
                hints: [
                    'Change the 3rd argument in scatter() to df[\'petal_width\']'
                ],
                starterCode: `import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import pandas as pd

df = pd.DataFrame(iris_data)

fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')

# TODO: Plot sepal_length, sepal_width, and petal_width
ax.scatter(..., ..., ...)

ax.set_xlabel('Sepal Length')
ax.set_ylabel('Sepal Width')
ax.set_zlabel('Petal Width')

plt.show()`
            },
            miniChallenge: {
                title: 'The Cube',
                description: 'Plot the corners of a cube: (0,0,0), (1,0,0), (0,1,0), (0,0,1), (1,1,1) etc.',
                expectedOutput: '8 dots forming a cube.',
                starterCode: 'import matplotlib.pyplot as plt\nfrom mpl_toolkits.mplot3d import Axes3D\n\n'
            }
        }
    },

    // --- Challenges ---
    {
        id: 'challenge-1',
        title: '14. Challenge: Analysis',
        icon: <Target className="w-4 h-4" />,
        description: 'Test your skills',
        content: {
            concept: `**MISSION BRIEFING: SECTOR 1** 🕵️‍♂️

**Objective:**
The head biologist needs to know the average *Sepal Length* for each species.

**Intel:**
- You have the data in a DataFrame.
- You need to **Group** the data by species.
- You need to **Calculate the Mean**.
- You need to **Visualize** it as a Bar Chart.

Good luck, Agent.`,
            whenToUse: `Use grouping to summarize data.`,
            syntax: `df.groupby('col').mean()`,
            codeExample: `# Example of grouping
import pandas as pd
df = pd.DataFrame(iris_data)

# Calculate mean of all numbers by species
means = df.groupby('species').mean()
print(means)`,
            practice: {
                task: 'Calculate the means grouped by species, then create a Bar Plot of the "sepal_length".',
                hints: [
                    'Use means["sepal_length"].plot(kind="bar")',
                    'Use plt.ylabel to label it'
                ],
                starterCode: `import matplotlib.pyplot as plt
import pandas as pd
df = pd.DataFrame(iris_data)

# 1. Calculate means
means = df.groupby('species').mean()

plt.figure(figsize=(6, 4))

# 2. Plot bar chart of sepal_length
# means['sepal_length'].plot(...)


plt.title("Average Sepal Length")
plt.show()`
            },
            miniChallenge: {
                title: 'Max Values',
                description: 'Instead of the Mean, find the MAXIMUM value for every column for each species.',
                expectedOutput: 'A table showing the max values.',
                starterCode: 'import pandas as pd\ndf = pd.DataFrame(iris_data)\n\n'
            }
        }
    },
    {
        id: 'challenge-2',
        title: '15. Challenge: Dashboard',
        icon: <Trophy className="w-4 h-4" />,
        description: 'The Final Exam',
        content: {
            concept: `**MISSION BRIEFING: THE FINAL EXAM** 🎓

**Objective:**
Produce a comprehensive dashboard for the executive presentation. They want to see the "Big Picture" and the "Specifics" on one page.

**Requirements:**
1.  **Top Chart**: A Scatter Plot (Sepal Length vs Sepal Width).
2.  **Bottom Chart**: A Box Plot (Petal Length by Species).
3.  **Layout**: 2 Rows, 1 Column.

This is it. Show us what you've learned.`,
            whenToUse: `Combining plots to tell a story.`,
            syntax: `fig, ax = plt.subplots(2, 1)`,
            codeExample: `# Subplots reminder
fig, axes = plt.subplots(2, 1)
axes[0].plot(...)
axes[1].plot(...)`,
            practice: {
                task: 'Create the 2x1 dashboard described above.',
                hints: [
                    'fig, ax = plt.subplots(2, 1, figsize=(6, 8))',
                    'Use ax=ax[0] and ax=ax[1] inside seaborn functions'
                ],
                starterCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(iris_data)
fig, ax = plt.subplots(2, 1, figsize=(6, 8))

# 1. Top Plot: Scatter


# 2. Bottom Plot: Box


plt.tight_layout()
plt.show()`
            },
            miniChallenge: {
                title: 'Side by Side',
                description: 'Create a 1x2 dashboard (Side by side). Left: Histogram of sepal_length. Right: Histogram of sepal_width.',
                expectedOutput: 'Two histograms side-by-side.',
                starterCode: 'import matplotlib.pyplot as plt\nimport seaborn as sns\nimport pandas as pd\n\n'
            }
        }
    }
];
