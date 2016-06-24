import React, { Component } from 'react';

import Link from './Link';

export default class Navbar extends Component {
	render() {
		return(
			<nav className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<div className="navbar-brand">
							Brokulator
						</div>
					</div>
          <ul className="nav navbar-nav">
            <li><Link route="calculation" label="Calculation" /></li>
            <li><Link route="transactions" label="Transactions" /></li>
            <li><Link route="accounts" label="Accounts" /></li>
					</ul>
				</div>
			</nav>
		)
	}
}