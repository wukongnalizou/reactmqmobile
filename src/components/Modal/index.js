import styles from './index.less';
import React, { Component } from 'react';
import close from './../../assets/iconClose.png';


class navBar extends Component {
    onClick = (type) => {
        if (type === 1) {
            this.props.setParentState(false, 'submit')
        } else {
            this.props.setParentState(false, 'close')
        }

    }
    render() {
        const { okText } = this.props
        return (
            <div>
                <div className={styles.root}>
                    <div className={styles.text}>
                        <img className={styles.close} src={close} onClick={() => this.onClick(2)} />
                        <div className={styles.gift}>{this.props.name}</div>
                        <div className={styles.content}>
                            {this.props.children}
                        </div>
                        <div className={styles.buttonSure} onClick={() => this.onClick(1)}>{okText || '确定'}</div>
                    </div>
                </div>

            </div>

        )
    }
}
export default navBar;