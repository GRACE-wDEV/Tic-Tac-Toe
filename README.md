
# 🎮 Tic Tac Toe

This project is a modern **Tic Tac Toe game** built with **React**, styled with **TailwindCSS**, and animated using **GSAP**.
It includes smooth text animations, restart transitions, and a glowing effect for the winning line.

---

## 🚀 Features

* ✅ Classic Tic Tac Toe gameplay with move history.
* 🎭 **GSAP animations**:

  * Title reveal animation (split text).
  * Restart button and game board fade-in.
  * Winning line highlight with bounce + glow effect.
* 🎨 Responsive layout using **TailwindCSS**.
* 🔄 Restart functionality to reset the board.
* ⏳ Time-travel feature: jump to any previous move.
* 📱 Mobile-friendly design.

---

## 🛠️ Tech Stack

* **React** (functional components + hooks)
* **TailwindCSS** (utility-first styling)
* **GSAP** (`@gsap/react` + `SplitText`) for animations

---

## ▶️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/tic-tac-toe-gsap.git
cd tic-tac-toe-gsap
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

---

## 🎥 Demo

When you open the game:

* The **title animates letter by letter**.
* The **Restart button and game board fade in**.
* When a player wins, the winning line **bounces + glows** with GSAP.

---

## 🧠 How It Works

* **Game State**: Managed with `useState` (tracks history, current move, and next player).
* **Winner Detection**: `calculateWinner()` checks all winning combinations.
* **Animations**:

  * `useGSAP()` hook for lifecycle-based animations.
  * `SplitText` for character-by-character title reveal.
  * `gsap.to()` to animate winning line cells.

---

## 📌 Future Improvements

* 🔊 Add sound effects for moves and wins.
* 👾 Add AI opponent (minimax algorithm).
* 🌈 Add more animation themes (neon, glitch, etc.).

---

## 📜 License

MIT License – feel free to use and modify this project.
