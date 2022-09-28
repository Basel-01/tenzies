export default function Die(props) {

  let bgStyle = {
    backgroundColor: props.die.isHeld ? "#59e391" : "#fff"
  }

  return (
    <p style={bgStyle} onClick={() => props.holdDice(props.die.id)}>{props.die.value}</p>
  )
}