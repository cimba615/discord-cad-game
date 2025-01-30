
# #add-and-remove 

## Command Names
- `/add-fighter`
- `/add-follower`
- `/remove-fighter`
- `/remove-follower`

## Command Objective
The **add** and **remove** commands allow players to manage characters in their teams. Since each user has two teams, careful management of both is required.

---

## Syntax

### Add Commands
- `/add-fighter <character_name> <spot_number>`
  - Sends a confirmation message.
- `/add-follower <character_name> <spot_number>`
  - Sends a confirmation message.

### Remove Commands
- `/remove-fighter <character_name> <spot_number>`
  - Sends a confirmation message.
- `/remove-follower <character_name> <spot_number>`
  - Sends a confirmation message.

---

## Important Notes
- ⚠ A card **cannot** be used as both a fighter and a follower. Its type depends on the card itself.
- The **add** command is **invalid** if:
  - There are already 5 members in the team.
  - The specified character name does not exist in the team.
  - A character with the same name already exists in the team.
    - ⚠ Even if the characters are from different versions (e.g., same character but with different stats), it is **not possible** to have both of them in the team.
- A character **cannot** exist as both a follower and a fighter in two teams. It can only belong to **one team** in **one role**.

# #clear

## Command Names
- `/clear-fighter`
- `/clear-follower`

## Command Objective
The **clear** commands are used to remove all characters from a specified team (fighters or followers). This enables users to quickly reset the team and start fresh.

---

## Syntax

### Clear Commands
- `/clear-fighter`
  - Removes all characters from the "fighter" team.
  - Sends a confirmation message.
- `/clear-follower`
  - Removes all characters from the "follower" team.
  - Sends a confirmation message.

---

## Conditions
- The command is **invalid** if the team is already empty.
- A character cannot belong to both teams simultaneously; clearing one team does not affect the other.

---

## Behavior
- After clearing a team:
  - All characters previously in that team are automatically marked as **available** for use in either team.
  - The system sends a **success message** to confirm the operation.

---

## Error Messages
- `"The team is already empty."` — If the command is used on an empty team.
- `"An error occurred. Please try again later."` — If an unexpected issue occurs.

 # #show

## Command Name
- `/show`

## Command Objective
The `/show` command displays detailed information about a specific character card in the user's collection, using either the card's **name** or its **unique ID**.

---

## Syntax
- `/show <character_name>`
- `/show <card_ID>`

---

## Behavior
- **Character Name**: If a name is provided, the command searches for the card in the user's collection and displays its details.
- **Card ID**: If an ID is provided, the command directly fetches the card's information.

---

## Displayed Information
- **Card Name**: The full name of the character.
- **Card ID**: The unique identifier of the card.
- **Rarity**: The rarity of the card (e.g., Common, Rare, Legendary).
- **Level**: The level of the card.
- **Type**: Indicates whether the card is a Fighter or a Follower.
- **Team Assignment**: Specifies whether the card is part of:
  - Fighter Team
  - Follower Team
  - Available (not assigned to any team)

---

## Conditions
- The command is **invalid** if:
  - The character name or card ID does not exist in the user's collection.
  - Multiple versions of the same character exist (e.g., alternate stats or artwork). In such cases, the user will be prompted to select the correct version using the **card ID**.

---

## Error Messages
- `"Character not found. Please check the name or card ID and try again."` — If the input does not match any card in the user's collection.
- `"You must specify either a name or a card ID."` — If neither input is provided.
- `"Multiple matches found for this name. Please use the card ID instead."` — If the name matches multiple cards.

# #show-team

## Command Names
- `/show-fighters`
- `/show-followers`

## Command Objective
The `/show-fighters` and `/show-followers` commands display the full list of characters currently assigned to the respective teams (fighters or followers).

---

## Syntax
- `/show-fighters`
- `/show-followers`

---

## Behavior
- Retrieves all characters assigned to the specified team and lists them in a structured format.
- If the team is empty, an appropriate message is displayed.

---

## Displayed Information for Each Character
- **Card Name**: The full name of the character.
- **Card ID**: The unique identifier of the card.
- **Rarity**: The rarity of the card (e.g., Common, Rare, Legendary).
- **Power**: The power provided by the card.
- **Position in Team**: The assigned spot in the team (1 to 5).

---

## Conditions
- The command is **invalid** if the respective team is empty.

---

## Error Messages
- `"The fighters team is currently empty."` — If `/show-fighters` is used and the fighters team has no characters.
- `"The followers team is currently empty."` — If `/show-followers` is used and the followers team has no characters.

# #collection

## Command Names
- `/collection fighters`
- `/collection followers`
- `/collection all`

## Command Objective
The `/collection` command allows users to view their card collection, with options to filter by **Fighters**, **Followers**, or display the entire collection (**All**).

---

## Syntax
- `/collection fighters`
- `/collection followers`
- `/collection all`

---

## Behavior
- **`/collection fighters`**: Displays only the Fighters collection.
- **`/collection followers`**: Displays only the Followers collection.
- **`/collection all`**: Displays the entire collection, grouped into Fighters and Followers.

---

## Displayed Information for Each Card
- **Card Name**: The name of the character.
- **Card ID**: The unique identifier for the card.
- **Rarity**: The rarity of the card (e.g., Common, Rare, Legendary).
- **Level**: The level of the card.

---

## Conditions
- If the user has no cards in the selected category, the response will indicate that no cards are available in that category.

---

## Notes
- For large collections, add **pagination** or **filtering options** (e.g., by rarity or name).
- Users can expand details for a specific card by using the `/show` command with its name or ID.

Here’s the formatted Markdown for the **evolve** command with the appropriate channel hashtag style:


# #evolve

## Command Name
- `/evolve`

## Command Objective
The `/evolve` command allows users to level up a card to its next stage. Evolution can be achieved in two ways:
1. By owning multiple copies of the same version of the card.
2. By accumulating enough **combat points** (for Fighters) or **relationship points** (for Followers) through specific activities.

---

## Syntax
- `/evolve <character_name> | <card_ID>`

---

## Behavior

### Step 1: Check Requirements
- **For Fighters**: Verify if the user has enough **combat points** or duplicate cards.
- **For Followers**: Verify if the user has enough **relationship points** or duplicate cards.

### Step 2: Level Up Card
- If the requirements are met, evolve the card to the next level and update its stats.

### Step 3: Consume Resources
- Deduct the necessary **duplicate cards** or **points** from the user's inventory.

### Restrictions
- **Friendly battles** (non-competitive) do not count toward combat points for Fighters.
- Points are **card-specific** and cannot be shared across different cards.

---

## Displayed Information Upon Success
- **Card Name**: The name of the evolved character.
- **New Level**: The updated level of the card.
- **Updated Stats**: Any attribute increases (e.g., Power).
- **Remaining Resources**: Number of duplicate cards or points left after evolution.

---

## Conditions
The command is **invalid** if:
1. The user does not meet the requirements (e.g., insufficient duplicates or points).
2. The card is already at its maximum level.
3. The character name or card ID does not exist in the user's collection.

---

## Error Messages
- `"You need more duplicates or points to evolve this card."`
- `"This card is already at its maximum level."`
- `"Character not found. Please check the name or card ID and try again."`


## Example Outputs

### Success Example
**Command**: `/evolve ID:54321`  
**Response**:  
```plaintext
Success!  
Card Name: Mikasa Ackerman  
New Level: 3  
Updated Stats: Power: X → Y  
Remaining Resources: Duplicate Cards: 1 | Relationship Points: 0/200 for the next level  

```

### Failure Example

**Command**: `/evolve Historia Reiss`  
**Response**:

```plaintext
Error:  
"You need 1 more duplicate card or 50 more relationship points to evolve this card."  
```

## Notes

-   **Combat Points**: Earned through successful competitive battles for Fighters.
-   **Relationship Points**: Earned through relationship-building commands for Followers.
-   Evolution enhances a card both visually (rarity appearance) and mechanically (stats and abilities).
-   A maximum level cap should be implemented for all cards.

```

Let me know if you need additional edits or enhancements!
```


# #show-info

## Command Name
- `/show-info`

## Command Objective
The `/show-info` command displays detailed information about a card from the game catalog, allowing users to learn about its attributes even if they do not own the card.

---

## Syntax
- `/show-info <character_name> | <card_ID>`

---

## Behavior
- **Character Name**: If the character name is provided, the command searches the game catalog for the card and displays its details.
- **Card ID**: If the card ID is provided, the command directly fetches the card's information from the catalog.

---

## Displayed Information
- **Card Name**: The full name of the character.
- **Card ID**: The unique identifier of the card.
- **Rarity**: The rarity of the card (e.g., Common, Rare, Legendary).
- **Type**: Specifies if the card is a Fighter or a Follower.
- **Base Stats**: The initial stats of the card (level 1).

---

## Conditions
- The command is **invalid** if the character name or card ID does not exist in the game catalog.

---

## Error Messages
- `"Card not found. Please check the name or card ID and try again."` — If the input does not match any card in the catalog.
- `"You must specify either a name or a card ID."` — If no input is provided.


# #packs

## Command Name
- `/pack`

## Command Objective
The `/pack` command allows users to open a specific card pack from a predefined list and obtain a random card based on the pack’s rarity and theme.

---

## Syntax
- `/pack <pack_name>`

---

## Behavior

### Step 1: Pack Selection
- The user selects a pack by its name from a predefined list of available packs.

### Step 2: Random Card Generation
- A card is randomly chosen from the selected pack’s pool based on its drop rates (rarity distribution).

### Step 3: Result Display
- The obtained card is shown to the user, along with its basic details and rarity.

### Step 4: Pack Cost
- Opening a pack requires in-game currency, which will be deducted when the pack is opened.

---

## Displayed Information
- **Pack Name**: The name of the pack opened.
- **Obtained Card**:
  - **Card Name**: The name of the character.
  - **Rarity**: The rarity of the card (e.g., Common, Rare, Legendary).
  - **Stats**: A brief overview of the card's attributes.

---

## Conditions
- The command is **invalid** if:
  - The pack name is not available in the current list.
  - The user lacks the necessary currency or resources to open the pack.

---

## Error Messages
- `"Pack not found. Please choose a valid pack from the list."`
- `"You do not have enough currency to open this pack."`


# #formation

## Command Name
- `/formation`

## Command Objective
The `/formation` command allows users to set up and customize their team formations by assigning Followers to boost specific Fighters. Depending on the chosen formation, the team composition (number of Fighters and Followers) and the boosts applied to the team will vary.


## Syntax
- `/formation <formation_name>`


## Behavior

### Step 1: Formation Selection
- The user selects a predefined formation that dictates the number of Fighters and Followers allowed.
- Each formation offers specific benefits (e.g., boosts to Attack, Defense, or Special stats).

### Step 2: Assignment Phase
- Users assign specific Followers to Fighters to apply their unique boosts.
  - For example, Follower #1 boosts Fighter #1 and Fighter #2.
- The system ensures the assignments respect the formation limits (e.g., if the formation allows 3 Fighters and 2 Followers, assignments are capped accordingly).

### Step 3: Confirmation
- Displays the finalized formation with all assignments and expected boosts for review and confirmation.

## Displayed Information
- **Formation Name**: The selected formation.
- **Team Composition**: The number of Fighters and Followers allowed.
- **Assigned Boosts**: Detailed view of which Follower boosts which Fighter and the specific stat bonuses applied.
- **Formation Benefits**: Summary of overall bonuses provided by the formation.

## Conditions
The command is **invalid** if:
- The user exceeds the allowed number of Fighters or Followers for the selected formation.
- Incompatible characters are assigned (e.g., a Follower cannot boost multiple Fighters unless explicitly allowed by the formation).

---

## Error Messages
- `"Invalid formation. Please choose a valid formation from the list."`
- `"Too many Fighters/Followers assigned. Please adjust to match the formation limits."`
- `"This Follower cannot boost more than one Fighter in this formation."`



## Example Outputs

### Success Example
**Command**: `/formation NumberX`  
**Response**:  
```plaintext
Formation Selected: Balanced Formation  
Team Composition: 3 Fighters, 2 Followers  
Follower Assignments:  
- Follower: Historia Reiss → Boosting Fighter: Eren Yeager (+10% Power)  
- Follower: Sasha Blouse → Boosting Fighter: Mikasa Ackerman (+15% Experience points win)  

Formation Benefits:  
- Overall Power Boost: +5%  
- Overall Money win Boost: +5%  

```
# #catalogue

## Command Name
- `/catalogue`

## Command Objective
The `/catalogue` command allows users to view the full list of cards available in the game. This helps players explore potential cards to obtain, strategize their teams, or learn about rarities and abilities.

---

## Syntax
- `/catalogue <filter> (optional)`

---

## Behavior

### Default View
- Displays the entire catalogue, grouped by rarity or type.

### Filters
- Users can refine their search using the following filters:
  - **Type**: Filter by card type (e.g., Fighter or Follower).
  - **Rarity**: Filter by card rarity (e.g., Common, Rare, Epic, Legendary). 
  - **Name**: Search for a specific character name or partial match.
  
### Pagination
- If the catalogue is large, results are displayed in pages for easier navigation.

---

## Displayed Information for Each Card
- **Card Name**: The full name of the character.
- **Card ID**: The unique identifier for the card.
- **Rarity**: The rarity of the card (e.g., Common, Rare, Legendary).
- **Type**: Specifies whether the card is a Fighter or a Follower.
- **Base Stats**: Initial stats for the card (level 1).

---

## Filters Example

- **Command**: `/catalogue fighter`  
  Displays only Fighter cards.
  
- **Command**: `/catalogue legendary`  
  Displays only Legendary cards.

---

## Conditions
- If the user specifies an **invalid filter** or **search term**, the system prompts them to use valid options.
- A **combination of filters** can be used for more refined searches.

---

## Error Messages
- `"No cards match your search criteria. Please adjust your filters and try again."`


Here’s the formatted Markdown for the **myshards** command with the appropriate channel hashtag style:


# #myshards

## Command Name
- `/myshards`

## Command Objective
The `/myshards` command displays all the shards a user currently owns. Shards are fragments of characters that can be combined to create new cards. They come in different ranks and types, with some shards being generic (usable for any character of a specific rank) and others being character-specific.

## Syntax
- `/myshards`

---

## Behavior

### Step 1: Display Shard Inventory
- Lists all shards owned by the user, grouped by rank and type.
- Shows the quantity of each shard and whether they are generic or character-specific.

### Step 2: Combination Progress
- For character-specific shards:
  - Indicates the progress toward assembling a specific character (e.g., "15/20 shards for Eren Yeager").
- For generic shards:
  - Indicates the rank and how many are needed to create a character of that rank (e.g., "10/50 generic Epic shards").

### Shard Types:
- **Generic Shards**: Usable for any character of a specific rank.
  - Examples: "Rare Shard," "Epic Shard," "Legendary Shard."
- **Character-Specific Shards**: Usable only to summon a particular character.
  - Examples: "Eren Yeager Shard," "Mikasa Ackerman Shard."

---

## Displayed Information for Each Shard
- **Shard Type**: Generic or Character-Specific.
- **Rank**: Common, Rare, Epic, or Legendary.
- **Character (if applicable)**: Name of the character the shard belongs to.
- **Quantity**: Number of shards owned and the total required to assemble.

---

## Conditions
- If the user has no shards, the response will indicate that their inventory is empty.

## Error Messages
- `"You do not own any shards currently."`


## Example Outputs

### Generic Shards Example
**Command**: `/myshards-generic`  
**Response**:  

```plaintext
Your Shard Inventory:
Generic Shards:
- Rank: Rare | Quantity: 10/20 (Create any Rare character)
- Rank: Epic | Quantity: 5/50 (Create any Epic character)

```

### Character-Specific Shards Example

**Command**: `/myshards-specifics`  
**Response**:

```plaintext
Your Shard Inventory:
Character-Specific Shards:
- Character: Mikasa Ackerman | Rank: Epic | Quantity: 15/20
- Character: Levi Ackerman | Rank: Legendary | Quantity: 2/30

```

# #shards

## Command Name
- `/shards`

## Command Objective
The `/shards` command allows users to assemble a character card using the shards they have collected. This includes both generic shards (usable for any character of a specific rank) and character-specific shards.



## Syntax
- `/shards <character name | card ID>`



## Behavior

### Step 1: Shard Type Validation
- If the user specifies a **character name**, the system checks if they have enough shards for that specific character.
- If the user specifies an **ID**, the system checks if they have enough generic shards for the card ID.

### Step 2: Assembly Process
- The required number of shards is deducted from the user's inventory.
- A new character card is created and added to the user's collection.

### Step 3: Feedback and Confirmation
- Displays the assembled character’s details, including name, rank, and stats.
- Notifies the user of remaining shards in their inventory.



## Conditions
- The command is invalid if:
  - The user specifies a **character name** or **rank** they do not have enough shards for.
  - The specified **character** or **rank** does not exist.



## Error Messages
- `"You do not have enough shards to create this character. Check your shard inventory with /myshards."`
- `"Invalid character or rank. Please check the catalogue for valid options."`


## Example Outputs

### Successful Assembly Example
**Command**: `/shards Mikasa Ackerman`  
**Response**:
```plaintext
Success!
Character Created: Mikasa Ackerman
Rank: Epic
Base Stats: Power: 100
Remaining Shards: Mikasa Ackerman Shards: 0

```

### Insufficient Shards Example

**Command**: `/shards ID:421`  
**Response**:

```plaintext
Error:
"You need 5 more Rare shards to create an Eren Jaeger character. Current progress: 15/20."

```

# #upshards

## Command Name
- `/upshards`

## Command Objective
The `/upshards` command allows users to upgrade lower-tier shards into higher-tier shards. This enables progression toward more powerful characters by consolidating weaker shards into stronger ones.


## Syntax
- `/upshards <shard rank>`


## Behavior

### Step 1: Shard Conversion
- Converts a specified number of shards of a lower tier into a shard of the next higher tier.  
  Example: `10 Rare shards → 1 Epic shard`.

### Step 2: Display Costs
- Before confirming the upgrade, the system displays the required number of shards for the conversion.
- Users can confirm or cancel the process.

### Step 3: Automatic Deduction
- Deducts the required shards from the user's inventory upon confirmation.
- Adds the upgraded shard(s) to the inventory.


## Conditions
- The command is invalid if:
  - The user does not have enough shards of the specified rank.
  - The user specifies a rank that cannot be upgraded (e.g., Max rank shards).


## Error Messages
- `"You do not have enough shards to upgrade. Check your shard inventory with /myshards."`
- `"Invalid rank. Only Common, Rare, or Epic shards can be upgraded."`


## Example Outputs

### Successful Upgrade Example
**Command**: `/upshards Rare`  
**Response**:
```plaintext
Upgrade Preview:
Conversion: 10 Rare shards → 1 Epic shard.
Confirm Upgrade? (Reply with /confirm to proceed.)

```

User replies with `/confirm`:

```plaintext
Success!
Upgraded Shards: 1 Epic shard added to your inventory.
Remaining Shards: Rare shards: 12

```

### Insufficient Shards Example

**Command**: `/upshards Epic`  
**Response**:

```plaintext
Error:
"You need at least 10 Epic shards to upgrade to a Legendary shard. Current progress: 5/10."

```

# #activities

## Command Details for Social Activities
These commands allow players to interact with their followers, enhancing relationships (XP) or earning money. Each activity has specific cooldowns, effects, and costs.


### Command: `/drink`
- **Effect**: Spend time drinking with one follower, increasing their friendship XP by 10.
- **Cooldown**: 1 hour.
- **Cost**: Free.
- **Example**: `/drink Sasha`
 
	 ```plaintext
	  "You shared a drink with Sasha. Friendship XP increased by 10. Come back in 1 hour to drink again!"
	```


### Command: `/meat`

-   **Effect**: Enjoy a meal with one follower, increasing their friendship XP by 25.
-   **Cooldown**: 8 hours.
-   **Cost**: Free.
-   **Example**: `/meat Mikasa`
    
    ```plaintext
    "You shared a hearty meal with Mikasa. Friendship XP increased by 25. Come back in 8 hours to eat again!" 
    ```

### Command: `/sleep`

-   **Effect**: Rest with one follower, increasing their friendship XP by 50.
-   **Cooldown**: 24 hours.
-   **Cost**: Free.
-   **Example**: `/sleep Armin`
    
    ```plaintext
    "You rested with Armin, sharing a peaceful night. Friendship XP increased by 50. Come back in 24 hours to sleep again!"
    ```

### Command: `/holidays`

-   **Effect**: Take a holiday with one follower, significantly increasing their friendship XP by 150.
-   **Cooldown**: 1 week.
-   **Cost**: Free.
-   **Example**: `/holidays Levi`
    
    ```plaintext
    "You took a relaxing holiday with Levi. Friendship XP increased by 150. Come back in 7 days for another holiday!"
    ```


### Command: `/party-time`

-   **Effect**: Throw a party for all your followers, increasing each follower's XP by 5.
-   **Cooldown**: No cooldown.
-   **Cost**: Requires money (e.g., 100 coins).
-   **Example**: `/party-time`
    
    ```plaintext
    "You threw a party for your followers! Each follower gained 25 XP. Cost: 1000 :money:."
    ```

### Command: `/worktime`

-   **Effect**: Send all followers to work, earning money but reducing their friendship XP by 10 each.
-   **Cooldown**: No cooldown.
-   **Cost**: Reduces follower XP but gives money.
-   **Example**: `/worktime`
    
    ```plaintext
    "Your followers worked hard, earning you 1000 :money:. Each follower lost 40 XP in friendship."
    ```
    

# #fight
## Commands Related to Fights and Competition

### Command: `/friendly`
- **Effect**: Start a friendly fight against another player. This fight does not affect rankings or grant rewards.
- **Syntax**: `/friendly @player`
- **Cooldown**: Various.
- **Example**: `/friendly @JohnDoe`
	```plaintext
	  "You challenged @JohnDoe to a friendly fight! Prepare for battle!"
	```

----------

### Command: `/arena`

-   **Effect**: Compete in ranked arena fights to climb the leaderboard. Winning grants leaderboard points and rewards.
-   **Syntax**: `/arena`
-   **Cooldown**: Based on daily limit.
-   **Example**: `/arena`
    
    ```plaintext
    "You entered the arena! Facing your opponent now..." 
    ```


### Command: `/arena-alert`

-   **Effect**: Activate or deactivate alerts to receive notifications when an arena fight against you has concluded.
-   **Syntax**: `/arena-alert on` or `/arena-alert off`
-   **Cooldown**: None.
-   **Example**: `/arena-alert on`
    
    ```plaintext
    "Arena alerts are now activated. You will be notified after every fight against you."
    ```


### Command: `/leaderboard`

-   **Effect**: View the current leaderboard standings in the arena. Displays the top players and their points.
-   **Syntax**: `/leaderboard`
-   **Cooldown**: None.
-   **Example**: `/leaderboard`
    
    ```plaintext
    "Current Arena Leaderboard:
    Player1 - 1500 points
    Player2 - 1450 points
    Player3 - 1400 points"
    ```


### Note:

>  May thinks about a leaderboard system for followers only as a
> **relation points** system.

 
# #trading
## Commands Related to Economy and Trading

### Command: `/sell`
- **Effect**: Sell one or more of your cards to another player.
- **Syntax**: `/sell card-name price:xxx` or `/sell card-ID price:xxx`
- **Example**: `/sell Mikasa Ackerman to: @player`
	 ```plaintext
	  "You sold Mikasa Ackerman for 500 :money: to @player."
	```

----------

### Command: `/quick-sell`

-   **Effect**: Quickly sell cards at a reduced price for immediate coins.
-   **Syntax**: `/quick-sell card-name` or `/quick-sell card-ID`
-   **Example**: `/quick-sell Mikasa Ackerman`
    
    ```plaintext
    "You quick-sold Mikasa Ackerman for 300 :money:."
    ```

### Command: `/wage`

-   **Effect**: Claim your wages based on your current arena rank. Higher ranks provide higher payouts.
-   **Syntax**: `/wage`
-   **Cooldown**: Claimable once per day.
-   **Example**: `/wage`
    
    ```plaintext
    "You claimed your wages based on Rank #5. You earned 500 :money:."
    ```

### Command: `/trade`

-   **Effect**: Trade one of your cards with another player. Both players must agree to the trade.
-   **Syntax**: `/trade @player card-ID-for-trade card-ID-wanted`
-   **Example**: `/trade @player card-123-for-trade card-456-wanted`
    
    ```plaintext
    "You are trading card 123 with @player for their card 456."
    ```
# #purchase
## Commands Related to Purchases

### Command: `/buy-pack`
- **Effect**: Display available card packs you can purchase with their prices.
- **Syntax**: `/buy-pack`
- **Example**: `/buy-pack`
	 ```plaintext
	  "Available Packs:
	  Starter Pack: 100 :money:
	  Warrior Pack: 300 :money:
	  Legendary Pack: 1000 :money:."

	```

	----------

### Command: `/buy-shards`

-   **Effect**: Display available shards you can purchase with their prices.
-   **Syntax**: `/buy-shards`
-   **Example**: `/buy-shards`
    
    ```plaintext
    "Available Shards:
    Rare Shard: 50 :money: each
    Epic Shard: 200 :money: each
    Legendary Shard: 500 :money: each."
    ```
# #claims
## Commands for Claiming and Obtaining Rewards

### Command: `/claim`
- **Syntax**: `/claim`
- **Cooldown**: None.
- **Example**: `/claim`
	 ```plaintext
		  "You claimed your pending rewards: 500 :money:, 2 Rare shards!"
	```

### Command: `/daily`

-   **Syntax**: `/daily`
-   **Cooldown**: 24 hours.
-   **Example**: `/daily`
    
    ```plaintext
    "You claimed your daily rewards: 1000 :money:, 1 Epic shard!"
    ```


### Command: `/weekly`

-   **Syntax**: `/weekly`
-   **Cooldown**: 7 days.
-   **Example**: `/weekly`
    
    ```plaintext
    "You claimed your weekly rewards: 4000 :money:, 5 Rare shards, and 1 Legendary shard!"
    ```

### Notes on Reward Systems

-   **Fighters vs. Followers Rewards**:  
    Rewards can be themed or divided by card type:
    
    -   Fighter-oriented rewards (e.g., combat bonuses, Fighter-specific shards).
    -   Follower-oriented rewards (e.g., relationship bonuses, Follower-specific shards).
-   **Scaling Rewards**:  
    Rewards may scale with player level or arena rank to incentivize consistent engagement.
    
-   **Character Chance**:  
    Include a chance to obtain a character as part of the reward system, not just shards, based on a percentage drop rate.