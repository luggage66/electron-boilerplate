import React from 'react';
import { observer } from 'mobx-react';
import styles from './styles';

@observer
export default class AppView extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.app}>
            <div className={styles.header}>
                Electron Boilerplate
            </div>
            <div className={styles.appBodyContainer}>
                Welcome to the electron boilerplate.
            </div>
        </div>;
    }
}
