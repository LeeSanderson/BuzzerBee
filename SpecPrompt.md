# Buzzer Bee - Game Specification

## Overview

Buzzer Bee is an endless side-scrolling game. The player controls a bee that must navigate through a series of obstacles while avoiding collisions. The game is built using React and utilizes HTML5 Canvas for rendering.

## Features

### 1. Core Gameplay

The player controls a bee that constantly moves forward.

Clicking/tapping makes the bee flap and ascend; releasing lets it descend due to gravity.

The goal is to pass through gaps between obstacles and achieve the highest score.

The game ends when the bee collides with an obstacle or the ground.

### 2. Obstacles

Vertical honeycombs (top and bottom) with randomly generated gaps.

The gaps become smaller over time to increase difficulty.

### 3. Score System

The player earns 1 point for each set of honeycombs successfully passed.

A high score is stored using localStorage.

### 4. Graphics & UI

Pixel-art style bee character.

Colorful honey-themed background with moving parallax effect.

Animated buzzing effect on the bee.

"Game Over" screen with retry button and best score display.

### 5. Sound Effects

 - A gentle buzzing sound while the bee is moving.
 - A "flap" sound when the player clicks/taps.
 - A "collision" sound when the bee crashes.
 - A point-scoring sound effect when passing through obstacles.

### 6. Difficulty Scaling

The game starts with larger gaps and slower movement.

Speed increases gradually, making the game more challenging.

Randomly placed flower bonuses that provide a short burst of invincibility.

### 7. Controls

Desktop: Click or press the spacebar to flap.

Mobile: Tap the screen to flap.

### 8. Game Loop & Rendering

The game should be built using React and HTML5 Canvas.

Animation should be handled with requestAnimationFrame().

Use React state for managing game logic and user interactions.

## Technical Requirements

Framework: React (functional components, hooks for state management)

Rendering: HTML5 Canvas API

State Management: React's useState and useEffect

Audio Handling: Web Audio API or simple HTML5 `audio` elements

Persistent Storage: LocalStorage for high scores

Deployment: Optimized for web (desktop & mobile responsiveness)