# Guide React Moderne

> Guide pédagogique complet basé sur la documentation officielle React 19.x
> Destiné aux développeurs JavaScript souhaitant maîtriser React moderne

---

## Table des matières

1. [Introduction à React](#1-introduction-à-react)
2. [Le modèle mental de React](#2-le-modèle-mental-de-react)
3. [JSX : La syntaxe de React](#3-jsx--la-syntaxe-de-react)
4. [Les composants](#4-les-composants)
5. [Props : Communication entre composants](#5-props--communication-entre-composants)
6. [State : La mémoire des composants](#6-state--la-mémoire-des-composants)
7. [Hooks essentiels](#7-hooks-essentiels)
8. [Gestion des événements](#8-gestion-des-événements)
9. [Rendu conditionnel](#9-rendu-conditionnel)
10. [Listes et clés](#10-listes-et-clés)
11. [Formulaires et entrées utilisateur](#11-formulaires-et-entrées-utilisateur)
12. [Gestion avancée du state](#12-gestion-avancée-du-state)
13. [Refs : Échapper au cycle de rendu](#13-refs--échapper-au-cycle-de-rendu)
14. [Effects : Synchronisation avec le monde extérieur](#14-effects--synchronisation-avec-le-monde-extérieur)
15. [Architecture React moderne](#15-architecture-react-moderne)
16. [Bonnes pratiques React modernes](#16-bonnes-pratiques-react-modernes)
17. [Pièges fréquents](#17-pièges-fréquents)
18. [Conclusion et prochaines étapes](#18-conclusion-et-prochaines-étapes)

---

## 1. Introduction à React

### Qu'est-ce que React ?

React est une **bibliothèque JavaScript** pour construire des interfaces utilisateur. Développée par Meta (Facebook), React révolutionne la façon dont nous pensons la création d'interfaces web en introduisant un paradigme **déclaratif** et **composant-centré**.

### Les principes fondamentaux

React repose sur trois piliers :

1. **Composants** : L'interface est décomposée en briques réutilisables
2. **Déclaratif** : Vous décrivez ce que vous voulez afficher, React s'occupe du comment
3. **Unidirectionnel** : Les données circulent dans un sens (du parent vers l'enfant)

### Pourquoi React en 2026 ?

- **Écosystème mature** : Plus de 10 ans d'évolution continue
- **Performance** : React Compiler (nouveau en 2024) optimise automatiquement vos composants
- **TypeScript natif** : Support de première classe pour TypeScript
- **Frameworks modernes** : Next.js, Remix, Expo s'appuient sur React
- **Communauté active** : Millions de développeurs, ressources abondantes

### Installation

Pour démarrer un nouveau projet React, utilisez un framework moderne :

```bash
# Next.js (recommandé pour les applications web)
npx create-next-app@latest mon-app

# Expo (pour les applications mobiles)
npx create-expo-app@latest mon-app

# Vite (pour un setup minimaliste)
npm create vite@latest mon-app -- --template react-ts
```

### Premier aperçu

Voici un composant React minimal :

```typescript
export default function Bienvenue() {
  return <h1>Bonjour, React moderne !</h1>;
}
```

Trois choses à noter :

- Une fonction JavaScript normale
- Du JSX (HTML-like) retourné
- Un export par défaut

---

## 2. Le modèle mental de React

### Penser en React

React adopte une approche **déclarative** opposée à l'approche **impérative** classique du DOM.

**Approche impérative (sans React) :**

```javascript
// Étape par étape : "comment faire"
const button = document.createElement('button');
button.textContent = 'Cliquez-moi';
button.onclick = () => alert('Cliqué !');
document.body.appendChild(button);
```

**Approche déclarative (React) :**

```typescript
// Description : "ce que je veux"
export default function Bouton() {
  return <button onClick={() => alert('Cliqué !')}>Cliquez-moi</button>;
}
```

### Les trois phases de React

React fonctionne en **trois étapes** distinctes :

```plaintext
1. TRIGGER (Déclenchement)
   ↓
2. RENDER (Rendu)
   ↓
3. COMMIT (Validation)
```

**1. Trigger** : Quelque chose change (premier rendu ou mise à jour de state)

**2. Render** : React appelle vos composants pour savoir ce qui doit s'afficher

- Les composants sont des **fonctions pures**
- Mêmes entrées = même sortie
- Pas d'effets de bord pendant le rendu

**3. Commit** : React met à jour le DOM (seulement les différences)

### L'arbre de composants

React construit un **arbre virtuel** de vos composants :

```typescript
function App() {
  return (
    <main>
      <Header />
      <ArticleList />
      <Footer />
    </main>
  );
}
```

Produit cet arbre :

```plaintext
App
├── main
    ├── Header
    ├── ArticleList
    └── Footer
```

Comprendre cette structure est essentiel pour :

- La gestion du state (où placer les données)
- L'optimisation (quels composants re-rendent)
- Le débogage (suivre le flux de données)

### État immutable vs mutable

**Principe clé** : Le state React doit toujours être traité comme **immutable** (non modifiable).

```typescript
// ❌ MAUVAIS : Mutation directe
const [user, setUser] = useState({ name: 'Alice' });
user.name = 'Bob'; // Ne déclenche PAS de re-rendu !

// ✅ BON : Création d'un nouvel objet
setUser({ ...user, name: 'Bob' }); // Déclenche un re-rendu
```

### Isolation du state

Chaque instance de composant possède son **propre state isolé** :

```typescript
function Compteur() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

function App() {
  return (
    <>
      <Compteur /> {/* State indépendant #1 */}
      <Compteur /> {/* State indépendant #2 */}
    </>
  );
}
```

Chaque `<Compteur />` maintient son propre compte indépendamment.

---

## 3. JSX : La syntaxe de React

### Qu'est-ce que JSX ?

JSX est une **extension syntaxique** de JavaScript qui ressemble à HTML mais qui est en réalité du JavaScript.

```typescript
const element = <h1>Bonjour, monde !</h1>;
```

### Les trois règles du JSX

#### Règle 1 : Un seul élément racine

```typescript
// ❌ INVALIDE : Plusieurs racines
function Mauvais() {
  return (
    <h1>Titre</h1>
    <p>Paragraphe</p>
  );
}

// ✅ VALIDE : Enveloppé dans un parent
function Bon() {
  return (
    <div>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </div>
  );
}

// ✅ MEILLEUR : Fragment (pas de div inutile)
function Meilleur() {
  return (
    <>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </>
  );
}
```

#### Règle 2 : Fermer toutes les balises

```typescript
// ❌ INVALIDE
<img src="photo.jpg">
<input type="text">

// ✅ VALIDE
<img src="photo.jpg" />
<input type="text" />
```

#### Règle 3 : camelCase pour les attributs

```typescript
// ❌ HTML classique
<div class="container" onclick="doSomething()">

// ✅ JSX React
<div className="container" onClick={doSomething}>
```

**Exceptions** : `aria-*` et `data-*` conservent les tirets (standard HTML).

### JavaScript dans JSX avec `{}`

Les accolades `{}` créent une "fenêtre" vers JavaScript :

```typescript
const user = {
  name: 'Alice',
  avatar: 'https://exemple.com/avatar.jpg'
};

function Profile() {
  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar} alt={user.name} />
      <p>Date : {new Date().toLocaleDateString()}</p>
    </div>
  );
}
```

### Styles en ligne

Les styles utilisent des **objets JavaScript** (double accolades) :

```typescript
function Card() {
  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px'
  };

  return (
    <div style={cardStyle}>
      {/* ou inline : */}
      <h2 style={{ color: 'blue', fontSize: '24px' }}>Titre</h2>
    </div>
  );
}
```

**Note** : Propriétés CSS en camelCase (`backgroundColor`, pas `background-color`).

### Expressions vs instructions

Dans JSX, on ne peut utiliser que des **expressions**, pas d'instructions :

```typescript
function Demo() {
  const isLogged = true;

  return (
    <div>
      {/* ✅ Expression : ternaire */}
      {isLogged ? <Dashboard /> : <Login />}

      {/* ✅ Expression : && */}
      {isLogged && <WelcomeMessage />}

      {/* ❌ Instruction : if/else ne fonctionne PAS */}
      {/* if (isLogged) { return <Dashboard /> } */}
    </div>
  );
}
```

---

## 4. Les composants

### Qu'est-ce qu'un composant ?

Un composant est une **fonction JavaScript** qui retourne du JSX :

```typescript
function MonComposant() {
  return <div>Je suis un composant !</div>;
}
```

### Convention de nommage

**Règle absolue** : Les composants commencent par une **majuscule**.

```typescript
// ✅ Composant React
function Button() { }
function UserProfile() { }

// ❌ Considéré comme balise HTML
function button() { } // <button> HTML, pas le composant
```

### Structure d'un composant moderne

```typescript
type ButtonProps = {
  text: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export function Button({ text, variant = 'primary', onClick }: ButtonProps) {
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}
```

**Éléments clés** :

- Type TypeScript pour les props
- Destructuration des props
- Valeurs par défaut
- Export explicite

### Composition de composants

Les composants s'imbriquent pour créer des interfaces complexes :

```typescript
function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  );
}

function Logo() {
  return <img src="/logo.svg" alt="Logo" />;
}

function Navigation() {
  return (
    <nav>
      <a href="/">Accueil</a>
      <a href="/about">À propos</a>
    </nav>
  );
}

function UserMenu() {
  return <button>Mon compte</button>;
}

export default function App() {
  return (
    <div>
      <Header />
      <main>{/* Contenu principal */}</main>
    </div>
  );
}
```

### Import et export

**Export par défaut** (un seul par fichier) :

```typescript
// Button.tsx
export default function Button() {
  return <button>Cliquez</button>;
}

// App.tsx
import Button from './Button'; // Nom au choix
```

**Exports nommés** (plusieurs par fichier) :

```typescript
// components.tsx
export function Button() { }
export function Input() { }
export function Card() { }

// App.tsx
import { Button, Input } from './components'; // Noms exacts
```

### Règle d'or : Pas de définitions imbriquées

**❌ JAMAIS faire ceci** :

```typescript
function Parent() {
  // ❌ Composant défini à l'intérieur d'un autre
  function Child() {
    return <div>Enfant</div>;
  }

  return <Child />;
}
```

**Pourquoi ?** `Child` est redéfini à chaque rendu, réinitialisant son state.

**✅ À faire** :

```typescript
function Child() {
  return <div>Enfant</div>;
}

function Parent() {
  return <Child />;
}
```

---

## 5. Props : Communication entre composants

### Qu'est-ce que les props ?

Les **props** (propriétés) sont des **arguments** passés aux composants. Elles permettent la communication **parent → enfant**.

```typescript
type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <h1>Bonjour, {name} !</h1>;
}

// Utilisation
<Greeting name="Alice" />
```

### Typage avec TypeScript

```typescript
type CardProps = {
  title: string;
  description?: string; // Optionnel
  onClick: () => void;
  children: React.ReactNode;
};

export function Card({ title, description, onClick, children }: CardProps) {
  return (
    <div className="card" onClick={onClick}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div>{children}</div>
    </div>
  );
}
```

### Valeurs par défaut

```typescript
type ButtonProps = {
  text: string;
  variant?: 'primary' | 'secondary';
};

export function Button({ text, variant = 'primary' }: ButtonProps) {
  // variant vaut 'primary' si non fourni
  return <button className={variant}>{text}</button>;
}
```

### La prop spéciale `children`

`children` représente le contenu **entre les balises** d'un composant :

```typescript
type ContainerProps = {
  children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

// Utilisation
<Container>
  <h1>Titre</h1>
  <p>Contenu</p>
</Container>
```

### Spread des props

Pour transmettre toutes les props :

```typescript
type ProfileProps = {
  name: string;
  age: number;
  city: string;
};

function ProfileDetails(props: ProfileProps) {
  return <UserCard {...props} />;
}
```

**Attention** : Utilisez avec modération pour maintenir la clarté du code.

### Props : Lecture seule

**Règle absolue** : Les props sont **immutables**.

```typescript
type CounterProps = {
  count: number;
};

function Counter({ count }: CounterProps) {
  // ❌ INTERDIT : Modifier une prop
  // count = count + 1;

  // ✅ Si besoin de modifier : utiliser le state
  const [localCount, setLocalCount] = useState(count);

  return <button onClick={() => setLocalCount(localCount + 1)}>
    {localCount}
  </button>;
}
```

### Passer des fonctions en props

Les fonctions permettent la communication **enfant → parent** :

```typescript
type SearchBarProps = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(query);
    }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

// Utilisation
function App() {
  const handleSearch = (query: string) => {
    console.log('Recherche :', query);
  };

  return <SearchBar onSearch={handleSearch} />;
}
```

---

## 6. State : La mémoire des composants

### Introduction au state

Le **state** est la mémoire d'un composant. Contrairement aux variables locales, il **persiste entre les rendus** et **déclenche un re-rendu** lorsqu'il change.

### Le Hook useState

```typescript
import { useState } from 'react';

function Counter() {
  // [valeur actuelle, fonction pour modifier]
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Cliqué {count} fois
    </button>
  );
}
```

**Syntaxe** :

```typescript
const [state, setState] = useState(initialValue);
```

### Pourquoi pas une variable normale ?

```typescript
function BrokenCounter() {
  let count = 0; // ❌ Réinitialisé à chaque rendu

  const handleClick = () => {
    count = count + 1; // Modifié localement
    // ❌ Pas de re-rendu déclenché
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

**Deux problèmes** :

1. La variable est réinitialisée à chaque rendu
2. Modifier la variable ne déclenche pas de re-rendu

### State avec TypeScript

```typescript
// Type inféré automatiquement
const [count, setCount] = useState(0); // number

// Type explicite
const [user, setUser] = useState<User | null>(null);

// Type union
type Status = 'idle' | 'loading' | 'success' | 'error';
const [status, setStatus] = useState<Status>('idle');
```

### Plusieurs states dans un composant

```typescript
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="checkbox"
        checked={agreed}
        onChange={e => setAgreed(e.target.checked)}
      />
    </form>
  );
}
```

### State comme snapshot

**Concept clé** : Le state est un **instantané** (snapshot) pour chaque rendu.

```typescript
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // count vaut 0
    setCount(count + 1); // count vaut toujours 0 !
    setCount(count + 1); // count vaut toujours 0 !
    // Résultat : count = 1 (pas 3 !)
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

**Pourquoi ?** Les trois appels utilisent le même snapshot où `count = 0`.

### Fonction de mise à jour

Pour baser une mise à jour sur la valeur précédente :

```typescript
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(n => n + 1); // n = 0, retourne 1
    setCount(n => n + 1); // n = 1, retourne 2
    setCount(n => n + 1); // n = 2, retourne 3
    // Résultat : count = 3 ✅
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

**Règle** : `setCount(n => n + 1)` reçoit la **dernière valeur en attente**.

### Objets dans le state

Les objets doivent être **remplacés**, pas mutés :

```typescript
type User = {
  name: string;
  age: number;
};

function UserProfile() {
  const [user, setUser] = useState<User>({ name: 'Alice', age: 30 });

  const updateName = (newName: string) => {
    // ❌ Mutation directe
    // user.name = newName;

    // ✅ Création d'un nouvel objet
    setUser({ ...user, name: newName });
  };

  return (
    <input
      value={user.name}
      onChange={e => updateName(e.target.value)}
    />
  );
}
```

### Objets imbriqués

```typescript
type Person = {
  name: string;
  address: {
    city: string;
    country: string;
  };
};

function PersonEditor() {
  const [person, setPerson] = useState<Person>({
    name: 'Alice',
    address: { city: 'Paris', country: 'France' }
  });

  const updateCity = (newCity: string) => {
    setPerson({
      ...person,
      address: {
        ...person.address,
        city: newCity
      }
    });
  };

  return (
    <input
      value={person.address.city}
      onChange={e => updateCity(e.target.value)}
    />
  );
}
```

### Tableaux dans le state

```typescript
type Todo = {
  id: number;
  text: string;
  done: boolean;
};

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Ajouter
  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  // Supprimer
  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Modifier
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>×</button>
        </li>
      ))}
    </ul>
  );
}
```

**Méthodes** :

- **Ajouter** : `[...array, newItem]`
- **Supprimer** : `array.filter(item => condition)`
- **Modifier** : `array.map(item => condition ? newItem : item)`

### Bibliothèque Immer (optionnel)

Pour simplifier les mises à jour complexes :

```typescript
import { useImmer } from 'use-immer';

function TodoList() {
  const [todos, updateTodos] = useImmer<Todo[]>([]);

  const toggleTodo = (id: number) => {
    updateTodos(draft => {
      const todo = draft.find(t => t.id === id);
      if (todo) {
        todo.done = !todo.done; // Mutation apparente, mais sûre
      }
    });
  };
}
```

---

## 7. Hooks essentiels

### Qu'est-ce qu'un Hook ?

Les **Hooks** sont des fonctions spéciales qui "accrochent" des fonctionnalités React à vos composants.

**Règles absolues** :

1. Appeler les Hooks **uniquement au niveau supérieur** (pas dans des boucles, conditions, ou fonctions imbriquées)
2. Appeler les Hooks **uniquement dans des composants React ou des Hooks personnalisés**

### useState

Déjà vu : gère le state local.

```typescript
const [state, setState] = useState(initialValue);
```

### useEffect

Synchronise votre composant avec un **système externe** (API, abonnements, DOM, etc.).

```typescript
import { useEffect, useState } from 'react';

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // S'exécute après chaque rendu
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Re-exécute si userId change

  return <div>{user?.name}</div>;
}
```

**Avec nettoyage** :

```typescript
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);

  window.addEventListener('resize', handleResize);

  // Fonction de nettoyage
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Tableau vide = exécute une fois au montage
```

### useRef

Stocke une valeur **mutable** qui ne déclenche **pas de re-rendu**.

```typescript
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

**Cas d'usage** :

- Référencer des éléments DOM
- Stocker des valeurs persistantes (timers, previous values)
- Éviter des re-rendus inutiles

### useContext

Consomme un **contexte** pour éviter le "prop drilling".

```typescript
import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('light');

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Bouton</button>;
}
```

### useReducer

Alternative à `useState` pour une logique complexe.

```typescript
import { useReducer } from 'react';

type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### useMemo

Mémorise le **résultat d'un calcul coûteux**.

```typescript
import { useMemo, useState } from 'react';

function TodoList({ todos }: { todos: Todo[] }) {
  const [filter, setFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    console.log('Calcul filtré');
    return todos.filter(todo => {
      if (filter === 'done') return todo.done;
      if (filter === 'todo') return !todo.done;
      return true;
    });
  }, [todos, filter]); // Recalcule seulement si todos ou filter change

  return <ul>{/* ... */}</ul>;
}
```

**Note** : React Compiler rend `useMemo` rarement nécessaire en 2026.

### useCallback

Mémorise une **fonction** pour éviter de la recréer.

```typescript
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // Fonction mémorisée
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Recréée seulement si les dépendances changent

  return <Child onClick={handleClick} />;
}
```

**Note** : Comme `useMemo`, rarement nécessaire avec React Compiler.

---

## 8. Gestion des événements

### Ajouter un gestionnaire d'événement

```typescript
function Button() {
  const handleClick = () => {
    alert('Cliqué !');
  };

  return <button onClick={handleClick}>Cliquez-moi</button>;
}
```

**Convention de nommage** : `handle` + nom de l'événement (`handleClick`, `handleSubmit`, etc.).

### Passer vs appeler une fonction

```typescript
// ✅ Passer la fonction (sans parenthèses)
<button onClick={handleClick}>Cliquez</button>

// ❌ Appeler la fonction (s'exécute immédiatement !)
<button onClick={handleClick()}>Cliquez</button>

// ✅ Fonction fléchée inline si besoin d'arguments
<button onClick={() => handleClick(id)}>Cliquez</button>
```

### Événements avec arguments

```typescript
type ItemProps = {
  id: number;
  name: string;
  onDelete: (id: number) => void;
};

function Item({ id, name, onDelete }: ItemProps) {
  return (
    <div>
      {name}
      <button onClick={() => onDelete(id)}>Supprimer</button>
    </div>
  );
}
```

### L'objet événement

```typescript
function Form() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Formulaire soumis');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

**Types courants** :

- `React.MouseEvent<HTMLButtonElement>`
- `React.ChangeEvent<HTMLInputElement>`
- `React.FormEvent<HTMLFormElement>`
- `React.KeyboardEvent<HTMLInputElement>`

### Propagation des événements

Les événements "remontent" (bubble) dans l'arbre DOM :

```typescript
function Parent() {
  return (
    <div onClick={() => alert('Div cliqué')}>
      <button onClick={() => alert('Bouton cliqué')}>
        Cliquez
      </button>
    </div>
  );
}
// Cliquer sur le bouton déclenche : "Bouton cliqué" puis "Div cliqué"
```

### Arrêter la propagation

```typescript
function Button() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Arrête la remontée
    alert('Bouton seulement');
  };

  return (
    <div onClick={() => alert('Div')}>
      <button onClick={handleClick}>Cliquez</button>
    </div>
  );
}
```

### Empêcher le comportement par défaut

```typescript
function Link() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Empêche la navigation
    console.log('Navigation custom');
  };

  return <a href="/about" onClick={handleClick}>À propos</a>;
}
```

---

## 9. Rendu conditionnel

### Opérateur ternaire

```typescript
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? <UserDashboard /> : <LoginForm />}
    </div>
  );
}
```

### Opérateur logique &&

```typescript
function Notification({ hasNewMessages }: { hasNewMessages: boolean }) {
  return (
    <div>
      {hasNewMessages && <span className="badge">Nouveau</span>}
    </div>
  );
}
```

**Attention** : Ne pas mettre un nombre à gauche du `&&` :

```typescript
// ❌ Affiche "0" au lieu de rien si count = 0
{count && <p>Vous avez {count} messages</p>}

// ✅ Comparaison explicite
{count > 0 && <p>Vous avez {count} messages</p>}
```

### If/else pour retours multiples

```typescript
function Status({ status }: { status: 'loading' | 'success' | 'error' }) {
  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <ErrorMessage />;
  }

  return <SuccessContent />;
}
```

### Retourner null

```typescript
function AdminPanel({ isAdmin }: { isAdmin: boolean }) {
  if (!isAdmin) {
    return null; // N'affiche rien
  }

  return <div>Panneau administrateur</div>;
}
```

### Variable conditionnelle

```typescript
function Item({ name, isPacked }: { name: string; isPacked: boolean }) {
  let content = name;

  if (isPacked) {
    content = <del>{name} ✅</del>;
  }

  return <li className="item">{content}</li>;
}
```

---

## 10. Listes et clés

### Rendre une liste

```typescript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### L'importance de `key`

Les **clés** aident React à identifier quels éléments ont changé, ont été ajoutés ou supprimés.

**Règles** :

- Utiliser un **identifiant stable** (ID de base de données)
- Les clés doivent être **uniques parmi les frères**
- **Ne pas utiliser l'index** du tableau (sauf si la liste ne change jamais)

```typescript
// ❌ MAUVAIS : Index comme clé
{users.map((user, index) => <li key={index}>{user.name}</li>)}

// ✅ BON : ID stable
{users.map(user => <li key={user.id}>{user.name}</li>)}
```

### Filtrer puis mapper

```typescript
type Product = {
  id: number;
  name: string;
  category: string;
};

function ProductList({ products }: { products: Product[] }) {
  const electronics = products.filter(p => p.category === 'electronics');

  return (
    <ul>
      {electronics.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### Fragments dans les listes

Pour rendre plusieurs éléments par item :

```typescript
import { Fragment } from 'react';

function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <>
      {recipes.map(recipe => (
        <Fragment key={recipe.id}>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <hr />
        </Fragment>
      ))}
    </>
  );
}
```

**Note** : `<Fragment>` avec `key` explicite, `<>` ne supporte pas `key`.

### Composant d'élément de liste

```typescript
type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>×</button>
    </li>
  );
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

**Astuce** : La `key` se met sur le composant, pas sur l'élément racine à l'intérieur.

---

## 11. Formulaires et entrées utilisateur

### Composants contrôlés

Un **composant contrôlé** est un input dont la valeur est gérée par React :

```typescript
function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
```

**Flux** :

1. L'utilisateur tape
2. `onChange` est déclenché
3. `setQuery` met à jour le state
4. React re-rend avec la nouvelle valeur

### Formulaire complet

```typescript
type FormData = {
  name: string;
  email: string;
  message: string;
};

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
    // Envoyer à une API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

### Checkbox et radio

```typescript
function Preferences() {
  const [newsletter, setNewsletter] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={newsletter}
          onChange={e => setNewsletter(e.target.checked)}
        />
        Recevoir la newsletter
      </label>

      <label>
        <input
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={e => setTheme('light')}
        />
        Thème clair
      </label>

      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={e => setTheme('dark')}
        />
        Thème sombre
      </label>
    </div>
  );
}
```

### Select

```typescript
function CountrySelector() {
  const [country, setCountry] = useState('fr');

  return (
    <select value={country} onChange={e => setCountry(e.target.value)}>
      <option value="fr">France</option>
      <option value="us">États-Unis</option>
      <option value="uk">Royaume-Uni</option>
    </select>
  );
}
```

### Validation

```typescript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.includes('@')) {
      newErrors.email = 'Email invalide';
    }

    if (password.length < 8) {
      newErrors.password = 'Mot de passe trop court (min. 8 caractères)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulaire valide');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit">Connexion</button>
    </form>
  );
}
```

---

## 12. Gestion avancée du state

### Lifting state up (remonter le state)

Quand deux composants doivent **partager le même state**, le remonter dans leur parent commun :

```typescript
function ParentComponent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <TabButtons activeTab={activeTab} onTabChange={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </>
  );
}

function TabButtons({
  activeTab,
  onTabChange
}: {
  activeTab: number;
  onTabChange: (index: number) => void;
}) {
  return (
    <div>
      <button onClick={() => onTabChange(0)}>Tab 1</button>
      <button onClick={() => onTabChange(1)}>Tab 2</button>
    </div>
  );
}

function TabContent({ activeTab }: { activeTab: number }) {
  return <div>Contenu de l'onglet {activeTab + 1}</div>;
}
```

### Préservation et réinitialisation du state

React préserve le state **tant que le composant reste à la même position** dans l'arbre :

```typescript
function Chat({ contact }: { contact: Contact }) {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h2>Chat avec {contact.name}</h2>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </div>
  );
}

function App() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <>
      {/* ❌ Le state du message persiste en changeant de contact */}
      <Chat contact={selectedContact} />

      {/* ✅ La clé réinitialise le state */}
      <Chat key={selectedContact.id} contact={selectedContact} />
    </>
  );
}
```

**Règle** : Utiliser `key` pour forcer la réinitialisation du state.

### useReducer pour une logique complexe

Quand vous avez **plusieurs valeurs de state liées** ou une **logique complexe**, utilisez `useReducer` :

```typescript
type Todo = { id: number; text: string; done: boolean };
type State = { todos: Todo[]; filter: 'all' | 'done' | 'todo' };
type Action =
  | { type: 'added'; text: string }
  | { type: 'deleted'; id: number }
  | { type: 'toggled'; id: number }
  | { type: 'filter_changed'; filter: State['filter'] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'added':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.text, done: false }]
      };
    case 'deleted':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id)
      };
    case 'toggled':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, done: !t.done } : t
        )
      };
    case 'filter_changed':
      return { ...state, filter: action.filter };
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    filter: 'all'
  });

  const addTodo = (text: string) => {
    dispatch({ type: 'added', text });
  };

  // ...
}
```

### Context pour éviter le prop drilling

```typescript
import { createContext, useContext, useReducer } from 'react';

const TodoContext = createContext<State | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { todos: [], filter: 'all' });

  return (
    <TodoContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoDispatchContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos doit être utilisé dans TodoProvider');
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error('useTodoDispatch doit être utilisé dans TodoProvider');
  return context;
}

// Utilisation
function App() {
  return (
    <TodoProvider>
      <TodoList />
      <AddTodoForm />
    </TodoProvider>
  );
}

function TodoList() {
  const { todos } = useTodos();
  const dispatch = useTodoDispatch();

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => dispatch({ type: 'toggled', id: todo.id })}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

## 13. Refs : Échapper au cycle de rendu

### Quand utiliser les refs

Les **refs** stockent des valeurs qui :

- Ne déclenchent **pas de re-rendu** lorsqu'elles changent
- Persistent entre les rendus
- Sont **mutables**

**Cas d'usage** :

- Stocker des IDs de timers/intervals
- Stocker des éléments DOM
- Stocker des valeurs pour des comparaisons (previous value)

### useRef pour stocker des valeurs

```typescript
import { useRef, useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div>
      <p>Temps écoulé : {count}s</p>
      <button onClick={start}>Démarrer</button>
      <button onClick={stop}>Arrêter</button>
    </div>
  );
}
```

### useRef pour accéder au DOM

```typescript
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Focusé automatiquement" />;
}
```

### Manipulation du DOM avec refs

```typescript
function ImageGallery({ images }: { images: string[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollToIndex = (index: number) => {
    const listNode = listRef.current;
    const imgNode = listNode?.querySelectorAll('li')[index];

    imgNode?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  return (
    <>
      <nav>
        {images.map((_, i) => (
          <button key={i} onClick={() => scrollToIndex(i)}>
            Image {i + 1}
          </button>
        ))}
      </nav>
      <ul ref={listRef}>
        {images.map((img, i) => (
          <li key={i}>
            <img src={img} />
          </li>
        ))}
      </ul>
    </>
  );
}
```

### Ref callbacks

Pour les listes dynamiques, utilisez une **ref callback** :

```typescript
function ItemList({ items }: { items: Item[] }) {
  const itemsRef = useRef<Map<number, HTMLLIElement>>(new Map());

  const scrollToId = (id: number) => {
    const node = itemsRef.current.get(id);
    node?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          ref={(node) => {
            if (node) {
              itemsRef.current.set(item.id, node);
            } else {
              itemsRef.current.delete(item.id);
            }
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### Refs vs State

| Caractéristique       | useRef                         | useState              |
| --------------------- | ------------------------------ | --------------------- |
| Retourne              | `{ current: value }`           | `[value, setValue]`   |
| Déclenche re-rendu    | Non                            | Oui                   |
| Mutable               | Oui (direct)                   | Non (via setter)      |
| Lecture pendant rendu | À éviter                       | Sûr                   |
| Cas d'usage           | DOM, timers, valeurs "cachées" | UI, données affichées |

---

## 14. Effects : Synchronisation avec le monde extérieur

### Qu'est-ce qu'un Effect ?

Un **Effect** permet de synchroniser votre composant avec un **système externe** (API, WebSocket, navigateur, bibliothèque tierce).

**Ne PAS utiliser d'Effect pour** :

- Transformer des données (faire dans le rendu)
- Gérer des événements utilisateur (utiliser des event handlers)

### useEffect de base

```typescript
import { useEffect, useState } from 'react';

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-exécute quand userId change

  if (loading) return <div>Chargement...</div>;
  return <div>{user?.name}</div>;
}
```

### Tableau de dépendances

```typescript
// Exécute après CHAQUE rendu
useEffect(() => { });

// Exécute SEULEMENT au montage (une fois)
useEffect(() => { }, []);

// Exécute quand count change
useEffect(() => { }, [count]);

// Exécute quand count OU name change
useEffect(() => { }, [count, name]);
```

**Règle** : **Toujours** inclure toutes les valeurs réactives (props, state, variables) utilisées dans l'Effect.

### Fonction de nettoyage

```typescript
useEffect(() => {
  // Configuration
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // Nettoyage
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

**Quand le nettoyage s'exécute** :

- Avant que l'Effect ne soit ré-exécuté
- Quand le composant est démonté

### Prévenir les race conditions

```typescript
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setResults(data);
        }
      });

    return () => {
      ignore = true; // Annule si le query change avant la fin
    };
  }, [query]);

  return <ul>{/* ... */}</ul>;
}
```

### Alternatives aux Effects

**❌ Transformer des données → Utiliser le rendu** :

```typescript
// ❌ MAUVAIS
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);

// ✅ BON
const fullName = firstName + ' ' + lastName;
```

**❌ Gérer des événements → Event handlers** :

```typescript
// ❌ MAUVAIS
useEffect(() => {
  if (submitted) {
    postData();
  }
}, [submitted]);

// ✅ BON
const handleSubmit = () => {
  postData();
  setSubmitted(true);
};
```

**✅ Utiliser useMemo pour les calculs coûteux** :

```typescript
const expensiveResult = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

### Cycle de vie d'un Effect

Un Effect peut se **synchroniser** et se **désynchroniser** plusieurs fois :

```typescript
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    console.log(`Connecté à ${roomId}`);

    return () => {
      connection.disconnect();
      console.log(`Déconnecté de ${roomId}`);
    };
  }, [roomId]);

  return <div>Chat : {roomId}</div>;
}
```

**Si roomId change de "general" à "music"** :

1. Nettoyage : Déconnecté de "general"
2. Setup : Connecté à "music"

### Effect Events (nouveau)

Pour accéder à des valeurs réactives **sans** qu'elles causent une re-synchronisation :

```typescript
import { useEffect, useEffectEvent } from 'react';

function Chat({ roomId, theme }: { roomId: string; theme: 'dark' | 'light' }) {
  const onConnected = useEffectEvent(() => {
    showNotification(`Connecté à ${roomId}`, theme);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', onConnected);
    connection.connect();

    return () => connection.disconnect();
  }, [roomId]); // theme n'est PAS une dépendance

  return <div>Chat</div>;
}
```

**`useEffectEvent`** extrait la logique non-réactive hors de l'Effect.

### Supprimer des dépendances inutiles

**Déplacer des objets/fonctions dans l'Effect** :

```typescript
// ❌ MAUVAIS : options change à chaque rendu
const options = { serverUrl, roomId };
useEffect(() => {
  const connection = createConnection(options);
  connection.connect();
}, [options]);

// ✅ BON : options créé dans l'Effect
useEffect(() => {
  const options = { serverUrl, roomId };
  const connection = createConnection(options);
  connection.connect();
}, [serverUrl, roomId]);
```

**Utiliser des fonctions de mise à jour** :

```typescript
// ❌ MAUVAIS : dépend de count
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]); // Re-crée l'interval à chaque seconde !

// ✅ BON : fonction de mise à jour
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []); // Interval créé une seule fois
```

---

## 15. Architecture React moderne

### Structure de projet recommandée

```plaintext
src/
├── components/
│   ├── ui/           # Composants réutilisables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layout/       # Composants de mise en page
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── features/     # Composants métier
│       ├── auth/
│       │   ├── LoginForm.tsx
│       │   └── SignupForm.tsx
│       └── todos/
│           ├── TodoList.tsx
│           └── TodoItem.tsx
├── hooks/            # Hooks personnalisés
│   ├── useAuth.ts
│   └── useTodos.ts
├── contexts/         # Contextes React
│   └── AuthContext.tsx
├── types/            # Types TypeScript
│   └── index.ts
└── utils/            # Fonctions utilitaires
    └── api.ts
```

### Hooks personnalisés

Extraire la logique réutilisable dans des Hooks :

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Utilisation
function App() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Thème : {theme}
  </button>;
}
```

### Custom Hook : useFetch

```typescript
type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!ignore) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Utilisation
function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;
  return <div>{user?.name}</div>;
}
```

### Pattern Provider

```typescript
// contexts/ThemeContext.tsx
import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans ThemeProvider');
  }
  return context;
}

// Utilisation
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Thème : {theme}</button>;
}
```

### Composition avec children

```typescript
type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return <div className={`card ${className}`}>{children}</div>;
}

type CardHeaderProps = {
  children: React.ReactNode;
};

Card.Header = function CardHeader({ children }: CardHeaderProps) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: CardHeaderProps) {
  return <div className="card-body">{children}</div>;
};

// Utilisation
function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <Card.Header>
        <h2>{user.name}</h2>
      </Card.Header>
      <Card.Body>
        <p>{user.bio}</p>
      </Card.Body>
    </Card>
  );
}
```

---

## 16. Bonnes pratiques React modernes

### 1. Composants purs

Les composants doivent être des **fonctions pures** pendant le rendu :

```typescript
// ❌ MAUVAIS : Effet de bord pendant le rendu
let counter = 0;
function Component() {
  counter++; // Modifie une variable externe
  return <div>{counter}</div>;
}

// ✅ BON : Aucun effet de bord
function Component({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  return <div>{count}</div>;
}
```

### 2. Éviter le state redondant

```typescript
// ❌ MAUVAIS : fullName est dérivé de firstName + lastName
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);

// ✅ BON : Calculer pendant le rendu
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = firstName + ' ' + lastName;
```

### 3. Éviter les dépendances d'objets/fonctions

```typescript
// ❌ MAUVAIS : handleClick est recréé à chaque rendu
function Component() {
  const handleClick = () => {
    console.log('Cliqué');
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]); // Re-créé l'Effect à chaque rendu !
}

// ✅ BON : Fonction stable
function Component() {
  useEffect(() => {
    const handleClick = () => {
      console.log('Cliqué');
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []); // Stable
}
```

### 4. Utiliser TypeScript

TypeScript prévient de nombreuses erreurs :

```typescript
// ❌ JavaScript : Erreurs silencieuses
function Greeting({ name }) {
  return <h1>Bonjour, {name.toUppercase()}</h1>; // Erreur runtime
}

// ✅ TypeScript : Erreur à la compilation
type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <h1>Bonjour, {name.toUpperCase()}</h1>; // IDE aide
}
```

### 5. Nommage cohérent

```typescript
// Convention recommandée :
// - Composants : PascalCase
// - Hooks : useCamelCase
// - Event handlers : handleCamelCase
// - Types : PascalCase

type UserProps = { /* ... */ };

function UserProfile({ user }: UserProps) {
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useCurrentUser();

  const handleEdit = () => {
    setIsEditing(true);
  };

  return <div>{/* ... */}</div>;
}
```

### 6. Extraire des composants petits

```typescript
// ❌ Composant monolithique
function Dashboard() {
  return (
    <div>
      <header>
        <img src="/logo.svg" />
        <nav>
          <a href="/">Accueil</a>
          <a href="/profile">Profil</a>
        </nav>
        <button onClick={logout}>Déconnexion</button>
      </header>
      <main>
        {/* 200 lignes de code... */}
      </main>
      <footer>
        <p>&copy; 2026</p>
      </footer>
    </div>
  );
}

// ✅ Composants modulaires
function Dashboard() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  );
}
```

### 7. Utiliser React Compiler (2024+)

React Compiler optimise automatiquement vos composants. Plus besoin de `useMemo`/`useCallback` dans la plupart des cas :

```typescript
// Avec React Compiler, ceci est automatiquement optimisé
function ExpensiveComponent({ data, filter }: Props) {
  // Pas besoin de useMemo, le compilateur l'ajoute
  const filtered = data.filter(item => item.type === filter);

  // Pas besoin de useCallback, le compilateur optimise
  const handleClick = () => {
    console.log('Cliqué');
  };

  return <div onClick={handleClick}>{/* ... */}</div>;
}
```

Configuration (Next.js 15.3.1+) :

```javascript
// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true
  }
};
```

### 8. Gestion d'erreurs

```typescript
import { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Erreur attrapée :', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oups, quelque chose s'est mal passé.</h1>
          <details>
            <summary>Détails de l'erreur</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Utilisation
function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
```

---

## 17. Pièges fréquents

### 1. Appeler une fonction au lieu de la passer

```typescript
// ❌ MAUVAIS : Appelle handleClick immédiatement
<button onClick={handleClick()}>Cliquez</button>

// ✅ BON : Passe la référence de la fonction
<button onClick={handleClick}>Cliquez</button>

// ✅ BON : Fonction fléchée si besoin d'arguments
<button onClick={() => handleClick(id)}>Cliquez</button>
```

### 2. Modifier le state directement

```typescript
const [items, setItems] = useState([1, 2, 3]);

// ❌ MAUVAIS : Mutation directe
items.push(4);
setItems(items); // Ne déclenche PAS de re-rendu !

// ✅ BON : Nouveau tableau
setItems([...items, 4]);
```

### 3. Utiliser l'index comme key

```typescript
// ❌ MAUVAIS : Bugs lors de réorganisation
{items.map((item, index) => <li key={index}>{item}</li>)}

// ✅ BON : ID stable
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

### 4. Oublier les dépendances d'Effect

```typescript
function Component({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  // ❌ MAUVAIS : userId manquant dans les dépendances
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, []); // userId ignoré !

  // ✅ BON : Toutes les dépendances incluses
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);
}
```

### 5. Créer des composants dans d'autres composants

```typescript
// ❌ MAUVAIS : Child est recréé à chaque rendu
function Parent() {
  function Child() {
    return <div>Enfant</div>;
  }
  return <Child />;
}

// ✅ BON : Composants au niveau supérieur
function Child() {
  return <div>Enfant</div>;
}

function Parent() {
  return <Child />;
}
```

### 6. State basé sur les props sans reset

```typescript
// ❌ MAUVAIS : initialColor ignoré si la prop change
function Component({ initialColor }: { initialColor: string }) {
  const [color, setColor] = useState(initialColor);
  // Si initialColor change, color reste inchangé !
}

// ✅ BON : Utiliser une key pour forcer le reset
<Component key={colorId} initialColor={color} />

// ✅ OU : Utiliser directement la prop
function Component({ color }: { color: string }) {
  // Pas de state, utilise directement la prop
  return <div style={{ color }}>{/* ... */}</div>;
}
```

### 7. Conditions sur les Hooks

```typescript
// ❌ MAUVAIS : Hook dans une condition
function Component({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // ERREUR !
  }
}

// ✅ BON : Hook au niveau supérieur
function Component({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [user, setUser] = useState(null);

  if (!isLoggedIn) {
    return <Login />;
  }

  return <Dashboard user={user} />;
}
```

### 8. Oublier preventDefault dans les formulaires

```typescript
function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    // ❌ OUBLIER ceci recharge la page
    e.preventDefault();

    // Traiter le formulaire...
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

### 9. Utiliser des nombres avec &&

```typescript
const [count, setCount] = useState(0);

// ❌ MAUVAIS : Affiche "0" au lieu de rien
{count && <p>{count} messages</p>}

// ✅ BON : Comparaison explicite
{count > 0 && <p>{count} messages</p>}

// ✅ OU : Ternaire
{count > 0 ? <p>{count} messages</p> : null}
```

### 10. Race conditions dans les Effects

```typescript
// ❌ MAUVAIS : Risque de race condition
useEffect(() => {
  fetch(`/api/data/${id}`)
    .then(res => res.json())
    .then(setData); // Peut définir de vieilles données !
}, [id]);

// ✅ BON : Flag ignore
useEffect(() => {
  let ignore = false;

  fetch(`/api/data/${id}`)
    .then(res => res.json())
    .then(data => {
      if (!ignore) {
        setData(data);
      }
    });

  return () => {
    ignore = true;
  };
}, [id]);
```

---

## 18. Conclusion et prochaines étapes

### Ce que vous avez appris

Vous maîtrisez maintenant les **fondamentaux de React moderne** :

1. **Modèle mental** : Approche déclarative, composants purs, flux de données unidirectionnel
2. **JSX** : Syntaxe, règles, expressions JavaScript
3. **Composants** : Création, composition, organisation
4. **Props** : Communication parent-enfant, typage TypeScript
5. **State** : useState, immutabilité, snapshots
6. **Hooks** : useEffect, useRef, useReducer, useContext, hooks personnalisés
7. **Événements** : Gestion, propagation, types TypeScript
8. **Rendu** : Conditions, listes, keys
9. **Formulaires** : Composants contrôlés, validation
10. **State avancé** : Lifting state up, reducers, Context API
11. **Refs** : DOM, valeurs mutables
12. **Effects** : Synchronisation, dépendances, nettoyage
13. **Architecture** : Structure de projet, patterns modernes
14. **Bonnes pratiques** : Code propre, performance, TypeScript
15. **Pièges** : Erreurs courantes à éviter

### Frameworks de production

Pour construire de vraies applications, utilisez un **framework** :

**Next.js** (recommandé pour le web) :

```bash
npx create-next-app@latest
```

- Rendu serveur (SSR)
- Génération statique (SSG)
- Routing basé sur les fichiers
- API routes
- Optimisation automatique

**Expo** (applications mobiles) :

```bash
npx create-expo-app@latest
```

- Applications iOS/Android/Web
- Développement unifié
- Composants natifs

**Remix** :

```bash
npx create-remix@latest
```

- Performance optimisée
- Progressive enhancement
- Standards web

### Bibliothèques essentielles

**Gestion de formulaires** :

- React Hook Form : `npm install react-hook-form`

**Requêtes de données** :

- TanStack Query : `npm install @tanstack/react-query`

**Routing (si pas de framework)** :

- React Router : `npm install react-router-dom`

**UI Components** :

- shadcn/ui : Composants modernes et accessibles
- Radix UI : Primitives accessibles

**Styling** :

- Tailwind CSS : `npm install -D tailwindcss`

### Ressources pour continuer

**Documentation officielle** :

- [react.dev](https://react.dev) - Documentation complète
- [Next.js docs](https://nextjs.org/docs)
- [TypeScript handbook](https://www.typescriptlang.org/docs/)

**Outils de développement** :

- React DevTools (extension navigateur)
- ESLint avec `eslint-plugin-react-hooks`
- Prettier pour le formatage
- Vite pour un environnement de développement rapide

**Concepts avancés à explorer** :

- Server Components (React 19)
- Suspense pour le chargement de données
- Concurrent rendering
- Patterns de tests (Jest, Testing Library)
- Animations (Framer Motion)
- State management avancé (Zustand, Jotai)

### Prochaines étapes recommandées

1. **Construire un projet complet** : Todo app, blog, dashboard
2. **Maîtriser TypeScript** avec React
3. **Apprendre Next.js** pour le déploiement en production
4. **Pratiquer les tests** avec React Testing Library
5. **Optimiser les performances** : React Compiler, Profiler
6. **Explorer les Server Components** (React 19)
7. **Contribuer à l'open source** React

### Derniers conseils

1. **Privilégier la simplicité** : La solution la plus simple est souvent la meilleure
2. **Lire le code des autres** : GitHub, bibliothèques populaires
3. **Suivre la communauté** : Twitter, Reddit, conférences
4. **Pratiquer régulièrement** : Construire, expérimenter, échouer, apprendre
5. **Rester à jour** : React évolue, suivez les nouveautés

---

**Félicitations !** Vous avez parcouru l'essentiel de React moderne. La prochaine étape est de **construire** : choisissez un projet qui vous passionne et lancez-vous. La meilleure façon d'apprendre React est de l'utiliser.

Happy coding! 🚀
