import styles from './index.less';
import React, { Component } from 'react';
import leftURL from './../../assets/iconBack.png';


 class navBar extends Component {
    routerBack =()=>{
        window.history.back(-1)
    }
    render() {
        return (
            <div className={styles.root}>
               <img className={styles.leftURL} src={leftURL} onClick={this.routerBack}/>
                <span className={styles.text}>{this.props.text}</span>
            </div>
        )
    }
}
export default navBar;