import React from 'react'
import { Link } from 'react-router-dom'
import close from '../../assets/close.svg'
import logo from '../../assets/logo.svg'
import TokenService from '../../services/TokenService'

export default class NavBar extends React.Component {
	handleLogout = (e) => {
		e.preventDefault()
		this.props.handleLogout(e)
		this.props.history.push('/')
	}

	render() {
		return (
			<nav>
				{TokenService.hasAuthToken() ? (
					<>
						<div
							className={`nav-home ${
								this.props.showNav ? 'show-nav' : null
							}`}
						>
							<div className="nav-close-container">
								<button
									onClick={this.props.handleNavToggle}
									className="close-nav"
								>
									<img src={close} alt="" />
								</button>
							</div>
							<div className="nav-logo">
								<img src={logo} alt="logo" />
							</div>
							<div className="nav-links">
								<Link
									to="/about"
									onClick={this.props.handleNavToggle}
								>
									<p>
										About<span className="arrow">→</span>
									</p>
								</Link>
								<Link
									to="/login"
									onClick={this.props.handleNavToggle}
								>
									<p>
										Log in<span className="arrow">→</span>
									</p>
								</Link>
								<Link
									to="/register"
									onClick={this.props.handleNavToggle}
								>
									<p>
										Sign up<span className="arrow">→</span>
									</p>
								</Link>
							</div>
						</div>
					</>
				) : (
					<div className="nav-home">
						<h1>
							<Link to="/">Mushroom Finder</Link>
						</h1>
						<div className="nav-links">
							<Link to="/">Home</Link>
							<button onClick={(e) => this.handleLogout(e)}>
								Log Out
							</button>
						</div>
					</div>
				)}
			</nav>
		)
	}
}   
              
        
    

