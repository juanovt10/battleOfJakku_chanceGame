# The Battle of Jakku

The Battle of Jaku is an engaging online game inspired by the renowned Star Wars franchise. In this game, the user is presented with three exciting options, allowing them to make strategic decisions that shape their gameplay experience. 

responsive screenshot

## Table of Contents
+ [UX](#ux)
+ [Design](#design)
+ [Features](#features)
+ [Testing](#testing)
+ [Technologies Used](technologies_used)
+ [Deployment](#deployment)
+ [Credits](#credits)

## UX

### Site purpose

The purpose of the site is to provide an interactive game where users engage by pressing buttons, receiving visual feedback for every action taken by the bot and the user.

### Site goal

Entertain users by presenting them with three distinct options and challenging them to strategize and determine the most effective choice to outsmart the bot.

### Audience

The website is designed for Star Wars fans who seek an interactive gaming experience.

### Current User Goals

Experience interactive engagement on the website and receive unique feedback based on the decisions made by either the user or the bot.

### Future User Goals

- Engage with the website
- Have visual feedback of each action taken, such as blinking colors, appearing popups and hovering effects. 

## Design 

### Color Scheme 

The website employs a streamlined monochromatic color scheme of black and white for the popups and titles, harmonizing with the deep space background. 

In terms of the "health bars," a visually intuitive traffic light color scheme is implemented: displaying vibrant green for optimal life levels, transitioning to yellow to indicate a moderate state, and intensifying to a striking red when life is nearing depletion. Furthermore, the blue color is applied to reflect the protective feedback of the cover action. 

The information popups feature a white shadow, while the winning and losing popups showcase a blue and red shadow respectively. These shadow colors represent the iconic and contrasting hues of the Star Wars Franchise, adding a touch of excitement and visual impact to the overall design.

### Typography

The Cantora One font is applied to all elements within the body, as it closely resembles the trademarked Star Wars font available in Google Fonts. 

### Imagery

The captivating deep space background image was acquired from [Freepik](https://www.freepik.com/) website, providing an immersive and atmospheric setting for the game. Additionally, the "avatars" for both the bot and user were obtained from [pngegg](https://www.pngegg.com/) website as vectors, enabling the space ships to seamlessly integrate with the cosmic surroundings, resulting in a harmonious visual composition.

The button and ammunition icons were sourced from [Font Awesome](https://fontawesome.com/), ensuring a visually appealing interface.

## Features

### Existing Features

#### Initial popups 

Upon loading the website, an initial popup promptly appears on the screen, providing an immediate point of interaction and engagement for the user:

SCREENSHOT OF INITIAL POPUP

The popup features an engaging storyline to intrigue the user, along with concise instructions on how to play. By simply clicking the button, the user is transported to the gaming platform, ready to begin their playthrough. 

#### Home page

The game interface features a header title and a concise paragraph restating the game's purpose. Below that, you'll find the game area displaying the health bar, avatar, and ammunition count for both the bot and the user. These components provide a clear overview of the essential elements in the game. 

Following that, the user controls are presented as three distinct buttons, allowing players to interact and exert control over their gameplay experience.

#### Gameplay

The game's main goal is to shoot the enemy while they are reloading. The user has three options: cover, reload, and shoot. Cover and reload can be chosen at any time, but shooting requires available ammunition. Each shot reduces the ammunition count, which gradually increases as the player reloads. Simultaneously, the bot will choose the same set of options. If it has ammunition available, it will randomly select one of the three options. However, if it doesn't have ammunition, it will randomly choose between cover or reload as its course of action.

#### Feedback queues 

To enrich the static game experience, visual feedback is employed to provide users with immediate responses to their decisions. 

- When selecting cover, the button hovers in blue, and the health bars blink between black and blue. 

- Reloading triggers a green hover effect on the button and a blinking green ammunition count, indicating the increase in ammunition. 

- The shoot button hovers in red when ammunition is available. When ammunition is depleted, the shoot button turns grey and the hover effect is disabled. Clicking the grey button triggers an information popup explaining that shooting is not possible at the moment and the amminution count will turn red.

- When either the bot or the user gets hit (e.g., the user shoots while the bot is reloading, or vice versa), the border of the health bar for the affected player flashes in red. Additionally, the health bar is reduced by 20% to reflect the impact. If the player's health falls below 70%, the shadow of the health bar changes to yellow, indicating a diminished health status. Furthermore, if the player's health drops below 30%, the shadow shifts to red, symbolizing a critical condition where life is nearing its end.

- When the user emerges victorious, a popup with a blue shadow appears, congratulating them with a brief story conclusion and an option to play again. In the event of the bot's victory, a different popup with a red shadow appears, indicating the user's defeat and providing the option to play again.

Testing

```
code
```