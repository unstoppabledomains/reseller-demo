import React from 'react'
import { IconContext } from 'react-icons'
import { MdKeyboardBackspace } from 'react-icons/md';


const Header = (props) => {
	return (
		<div className="header">
			<IconContext.Provider value={{
				style: {
					verticalAlign: 'middle',
					fontSize: '2.4em',
					padding: '0 0 0 10px',
					fontWeight: 'normal'
				}
			}}>
				<MdKeyboardBackspace onClick={() => props.history.go(-1)} />
			</IconContext.Provider>
			<span className="Title">{props.title || "Buy .zil domains"}</span>
			<span className="Title">{props.step || "1 / 3"}</span>
		</div>
	)
}

export default Header
