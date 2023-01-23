import React from 'react';
import PropTypes from 'prop-types';
import styles from './informationcard.module.css';

const Informationcard = () => (
  <div className={styles.Informationcard} data-testid="Informationcard">
    Informationcard Component
  </div>
);

Informationcard.propTypes = {};

Informationcard.defaultProps = {};

export default Informationcard;
