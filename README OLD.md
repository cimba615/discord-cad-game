## Discord-Based Trading Card Game (TCG) Documentation

### Channels Setup
1. **#game-rules**: A channel where the rules of the TCG are posted for players to reference.
2. **#card-showcase**: Players can view and discuss various cards.
3. **#battle-arena**: The primary channel for playing matches.
4. **#team-strategy**: Players strategize with their teammates or solo for upcoming matches.

---

### Rules of Play

#### Objective
Players battle against each other by using their cards to outsmart and overpower their opponents. The goal is to reduce your opponent's health points (HP) to zero or fulfill specific victory conditions determined by the game mode.

#### Card Structure
Each card includes the following attributes:
- **SPD**: Speed determines the attack order.
- **ATK**: Attack power used in damaging opponents.
- **HP**: Health points of the card.
- **DEF**: Defense reduces incoming damage.
- **Rarity**: Ranges from SSR, UR, to other ranks indicating card power.
- **Abilities**:
  - *Ability 1*: A unique skill that activates based on the scenario.
  - *Ability 2*: A secondary skill with specific conditions.
- **Special**: Synergistic or passive bonuses activated under specific team setups.

#### Sample Card
**Sanemi Shinazugawa**
- SPD: 679
- ATK: 980 (SSR)
- HP: 1817 (UR)
- DEF: 302 (SSR)
- **Ability 1**: During your first turn, get double the ATK.
- **Ability 2**: If last alive, gain +150 DEF and +950 ATK.
- **Special**: If another Demon Slayer card is in your team, +50 to all stats for Sanemi only.

#### Game Setup
1. Players select a deck containing a maximum of 5 cards.
2. Each player can view their deck's stats and strategize accordingly.
3. The game begins with each player rolling a dice or using the SPD stat to determine the order of play.

#### Turn Phases
1. **Preparation Phase**:
   - Players review their hand and can activate passive effects or prepare abilities that trigger at the start of the turn.

2. **Action Phase**:
   - The player in turn selects a card to attack or use an ability.
   - Calculate damage:
     - Damage = ATK - Opponent’s DEF (minimum damage is 1).
   - Apply damage and adjust HP accordingly.

3. **End Phase**:
   - Players resolve any end-of-turn abilities or effects.
   - The turn passes to the next player.

#### Winning the Game
- **Elimination**: Defeat all opponent cards by reducing their HP to zero.
- **Special Win Conditions**: Some game modes or card effects may introduce alternate victory conditions (e.g., controlling the battlefield for X turns).

#### Additional Rules
- Players may not use more than two duplicate cards in their deck.
- Cards must adhere to the synergy rules as defined in their Special abilities.
- Any disputes during a match are resolved by the designated game moderator.

---

### Scenarios & Examples
**Example Scenario**:
- Player 1 attacks using "Sanemi Shinazugawa" (ATK: 980).
- Player 2 defends with "Tanjiro Kamado" (DEF: 400, HP: 1200).
- Damage Calculation: 980 (ATK) - 400 (DEF) = 580 damage.
- Player 2’s card HP is reduced to 620 (1200 - 580).

Special Ability Trigger:
- If Sanemi is the last alive card, his "Ability 2" activates, boosting his DEF to 452 and ATK to 1930, making him a formidable solo fighter.

---

### Game Moderation
- A bot will handle damage calculations, ability activations, and turn management.
- Moderators can step in to resolve issues or ensure fair play.

---

### Future Development
- Add new card sets with unique abilities.
- Implement ranked and casual match systems.
- Develop synergy bonuses for teams with thematic connections (e.g., all Demon Slayer cards).

<<<<<<< HEAD
=======
- Initiated a ready-to-start code.
- Added command registration mechanism.
- Added *Commands.txt* with simplified explanation.


# Others
> Test Server: https://discord.gg/GWza2UuJ
>>>>>>> 833579f4fd4a17176506ff7c727cf9256671a4c3
