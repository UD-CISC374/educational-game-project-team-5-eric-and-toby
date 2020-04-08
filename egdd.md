---
waltz:
  title: Educational Game Design Document Template
meta:
  version: 0.0.2
  gdd authors:
    - Your name goes here
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---

# Game Name
Woolgathering

## Elevator Pitch

Herd sheep and make wool in this fast paced puzzle game designed to teach fractional representations to elementary school students. 



## Influences (Brief)


- Monument Valley:
  - Medium: Phone game
  - Explanation: We were inspired by the clean, colorful, and charming appearance of this game. The design of its protagonist also inspired our protagonist's triangular shape.
- Butser Ancient Farm:
  - Medium: Experimental archaeology site and museum
  - Explanation: While researching an alternate idea, we discovered this museum. Its recreation of Iron Age buildings and farm animals inspired the setting of our game.


## Core Gameplay Mechanics (Brief)

*Give a very high-level description of any core gameplay mechanics*

- *Gameplay Mechanic #1*
Left click to move sheep and match them into a correct fractional form 
- *Gameplay Mechanic #2*
Right click to remove sheep that are thought to be in a correct fractional form,
if correct, gain time and score, if incorrect, lose time
- *Gameplay Mechanic #3*
Match more sheep correctly and quickly to build up a score multiplyer, use score
to purchase items for player customization and for gameplay modifiers, possibly

# Learning Aspects

## Learning Domains

Elementary School Math Education 
Fractional Representation 

## Target Audiences

*Who are your learners?*
Elementary school students in grades 3 through 6

## Target Contexts

*Describe what kinds of formal and informal learning contexts this will be used in (e.g., courses, k-12 computer labs during free time).*
Elementary school and middle school computer labs during free time

## Learning Objectives

*Remember, Learning Objectives are NOT simply topics. They are statements of observable behavior that a learner can do after the learning experience. You cannot observe someone "understanding" or "knowing" something.*

- Students will be able to depict fractions as groups of different objects.
- Students will be able to select the correct numerical equivalent to an image showing a fraction.
- Students will be able to select the correct image to depict a numerical fraction.

## Prerequisite Knowledge

*What do they need to know prior to trying this game?*

- Students must be able to use the arrow keys and letter keys on a keyboard.
- Students must be able to use a computer mouse.
- Students must be able to define a fraction.

## Assessment Measures

*Describe how the learning will be assessed, e.g., pre/post multiple-choice test, or SAT, or some other instrument.*

*If proposing a new instrument, briefly and concisely list some example assessment questions.*
Students will be given a pre/post multiple-choice test where they are asked to examine an image depiction of a fraction and pick the correct numerical equivalent.

# What sets this project apart?

*Give some reasons why this game is not like every other game out there. Whether the learning objective is unique, the gameplay mechanics are new, or what. You should persuade the reader that your game is novel and worthy of development. Consider arguments that would be persuasive to a Venture Capitalist, Teacher, or Researcher. These might be focused on learning needs, too.*

- Popular game mechanic used for education
- Unusual setting
- Fun and appealing art style

# Player Interaction Patterns and Modes

## Player Interaction Pattern

*Describe how people play your game, how many players are involved at once, how they interact with the system works, etc.*
Single player at a time, mouse interaction

## Player Modes

*Your game has one or more player modes. Describe each discrete mode, considering things like menus too. Generally describe the transitions between modes too.*

- Start menu: Has buttons "tutorial" and "play game", each takes player to that gameplay mode when clicked
- Tutorial mode: Simple text descriptions of gameplay with corresponding images, progresses to next section when player clicks, returns to main menu at the end
- Gameplay: Board filled with sheep, with scorecard, time remaining, and desired fraction displayed to the side. When time remaining is 0, it takes the player to the Game end screen.
- Game end: Displays final score, "main menu" button that takes player back to main menu when clicked

# Gameplay Objectives

- Group sheep:
    - Description: Group sheep according to fraction given by game
    - Alignment: Students must select a grouping of sheep that matches the fraction given by the game
- Make as many groups as possible within time:
    - Description: Once the player selects a grouping of sheep matching the fraction, the sheep are removed from the board and new sheep are added at the top
    - Alignment: Gives incentive to make groups


# Procedures/Actions

Left click: click and hold on a sheep to pick it up and move it elsewhere on the board.
All other sheep in the row will then move over 1 and the sheep will move the rest of 
them over. 
Right click: when right clicking on a selected group of sheep, the game will then see
if the correct fraction can be made out of it. If the fraction is correct, then the sheep will 
be removed and the player will gain points + time. If not, the player will lose time, a noise will sound,
and play resumes. 


# Rules

There will be both time and score in this game. From the moment it starts, the timer 
will begin to tick down. If it reaches 0, the game is over and your score is presented.
Players gain additional time by making the correct fraction, shown on screen. Players will
lose time if the fraction they selected is incorrect and over time. 
# Objects/Entities

Sheep: differently colored, used to represent the fractions the player must meet.

## Core Gameplay Mechanics (Detailed)

- Sheep repositioning: Player clicks and drags one sheep across the board to swap its position with other sheep. The player's selected sheep will follow the mouse cursor, and when it overlaps with a different sheep, the second sheep will swap into the empty space left by the selected sheep.
- Group selection: Player left-clicks on multiple adjacent sheep to select them. Player right-clicks when they think they have a group selected that matches the fraction. If correct, the sheep disappear and the player's score is incremented by 100. If incorrect, the game gives the player a "Try again!" message, and the timer is decreased by a short period of time.
- *Core Gameplay Mechanic #3*: *Describe in 2 paragraphs or less, along with how it generally works*

    
## Feedback
As the player gets more and more matches quickly and accurately, their score multiplyer will increase. Additional score will be 
accompanied by sound effects cues and bonus time granted by successful matches. If the player cant find a match over 
a certain period of time. A glow will appear on sheep that can be swapped to make matches. Additional score can be spent on items
to customize player appearance and potentially open new game modes and modifiers. 

# Story and Gameplay

## Presentation of Rules

Upon first loading the game, the player character will be brought into a scene where they are shepherding with a "master" shepherder. The "master"
will be a computer controlled character, who will first go to the fractional representation, and then say a speach bubble 
representing the colored sheep fraction that it represents. He will then go into the sheep pen and move some around until he has the 
correct fraction and remove it. Then, he will get the player and have them do the same. He will instruct them through moving their first sheep 
with left click and removing them with right click. Then, he will go to an advisory role for the rest of the game, 
helping stuck players by illuminating potential matches and giving encouraging noices when you are doing well. 


## Presentation of Content

The content and gameplay are presented alongside each other, so as the player learns the rules of the game,
they are also instinctively learning about fractions and thier representation. 

## Story (Brief)
You are an apprentice shepherder who is taking over a flock from an old master. You want 
to be the best sheep shearer alive, and deliver the highest quality wool possible, as it 
is your life goal. 

## Storyboarding

*Go into as much detail as needs be to visually convey the Dynamics of your game. Be detailed. Create storyboards and freeze frame images that concisely capture important key elements of your game. You are strongly recommended to sketch pictures on paper and embed them here. Be sure make it clear how previously-described mechanics come through in the dynamics.*
![alt text](https://media.discordapp.net/attachments/631892830427807764/693934980010868807/unknown.png "Start screen")
![alt text](https://cdn.discordapp.com/attachments/631892830427807764/693932016231514142/unknown.png "Tutorial")
![alt text](https://media.discordapp.net/attachments/631892830427807764/693935046478004315/unknown.png "Main screen")
![alt text](https://cdn.discordapp.com/attachments/631892830427807764/693924796270116894/image0.jpg "Gameplay")
![alt text](https://media.discordapp.net/attachments/631892830427807764/693933437530144870/unknown.png "Endscreen")

# Assets Needed

## Aesthetics

The Aesthetics of our game will be one of a calming, relaxing atmosphere. Lots of bright colors 
and simple shapes. Relaxing music, calm environments, and encouraging sounds and music even when you make mistakes. 

## Graphical

- Characters List
  - Player character 
  - Old master
  - Sheep
- Textures:
  - Sheep textures
  - Player textures (hat, clothes, cape, pants)
- Environment Art/Textures:
  - Background 
  - Sheep pen
  - Fraction representation + counters 


## Audio


*Game region/phase/time are ways of designating a particularly important place in the game.*

- Music List (Ambient sound)
  - Title screen music 
  - Main menu music
  - Game play music 
  - Game over music 
  - multiplier music 
  
*Game Interactions are things that trigger SFX, like character movement, hitting a spiky enemy, collecting a coin.*

- Sound List (SFX)
  - Succesful matches
  - Unsuccessful matches 
  - Sheep baa upon clicking 


# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
