import React from 'react'


export default function App(){
const [count, setCount] = React.useState(0)


return (
<div style={{fontFamily: 'sans-serif', padding: 24}}>
<h1>React + Jenkins Demo App</h1>
<p>Ye ek simple counter app hai jo build aur deploy pipeline test karne ke liye banaya gaya hai.</p>


<div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
<button onClick={() => setCount(c => c - 1)}>-</button>
<strong>{count}</strong>
<button onClick={() => setCount(c => c + 1)}>+</button>
</div>


<hr />


<p>Build time: <em>{new Date().toLocaleString()}</em></p>
</div>
)
}
