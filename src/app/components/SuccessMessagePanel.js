import React from 'react';
import './css/SuccessMessagePanel.css';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Tooltip
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCoins, faClipboard } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as decimalsActions from '../actions/decimalsActions';
import * as tokenNameActions from '../actions/tokenNameActions';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
import * as totalSupplyActions from '../actions/totalSupplyActions';
import * as tokenTypeActions from '../actions/tokenTypeActions';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as appStateActions from '../actions/appStateActions';
import * as tokenOwnerFundsActions from '../actions/tokenOwnerFundsActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import * as accountsActions from '../actions/accountsActions';
import * as serviceFeeActions from '../actions/serviceFeeActions';
import initialState from '../reducers/initialState';
import ReactGA from 'react-ga';

export class SuccessMessagePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
  }

  componentWillMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/success"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/success');
  }

  handleBackClick(e) {
    this.props.decimalsActions.setDecimals(initialState.decimals);
    this.props.tokenNameActions.setTokenName(initialState.tokenName);
    this.props.tokenSymbolActions.setTokenSymbol(initialState.tokenSymbol);
    this.props.totalSupplyActions.setTotalSupply(initialState.totalSupply);
    this.props.tokenTypeActions.setTokenType(initialState.tokenType);
    this.props.tokenOwnerActions.setTokenOwner(initialState.tokenOwner);
    this.props.appStateActions.setAppState(initialState.appState);
    this.props.tokenOwnerFundsActions.setCheckingTokenOwnerFunds(initialState.checkingTokenOwnerFunds);
    this.props.tokenOwnerFundsActions.setTokenOwnerHasEnoughFunds(initialState.tokenOwnerHasEnoughFunds);
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
    this.props.accountsActions.loadAllAccounts();
    this.props.serviceFeeActions.setServiceFee(initialState.serviceFee);
  }

  // a hack that creates an element outside the screen and uses it to copy its content to clipboard
  handleCopyToClipboard(e) {
    const el = document.createElement('textarea');
    el.value = this.props.infoMessage;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render() {
    const etherscanLink = "https://etherscan.io/address/" + this.props.tokenOwner;
    const transactionLink = "https://etherscan.io/tx/" + this.props.infoMessage;

    return (
      <div>
        <Card className="card">
          <CardHeader
            title="Thank You For Using TokenMint!"
            classes={{
              root: "card_header",
              title: "card_header_text"
            }}
            avatar={<FontAwesomeIcon size="2x" className="fa_success_icon" icon={faCheckCircle} />}
          />
          <CardContent
            classes={{
              root: "card_content"
            }}
          >
            <Typography
              align="center"
              variant="subtitle1"
              className="typography_success_info_message"
            >
              Your transaction has been successfully submitted to Ethereum network.
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              className="typography_success_info_message"
            >
              Your token creation transaction hash is:
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              className="typography_success_info_message"
            >
              <a href={transactionLink} rel="noopener noreferrer" target="_blank">
                {this.props.infoMessage}
              </a>
              <Tooltip title="Copy to clipboard">
                <FontAwesomeIcon className="fa_clipboard" icon={faClipboard} onClick={this.handleCopyToClipboard} />
              </Tooltip>
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              className="typography_success_info_message"
            >
              Once the mining is finished, you can check your new assets on <a href={etherscanLink} rel="noopener noreferrer" target="_blank">etherscan</a>
            </Typography>
          </CardContent>
        </Card>
        <form className="footer_main_form">
          <span
            className="btn btn-success-back wow fadeInUp"
            data-wow-duration="1000ms"
            data-wow-delay="400ms"
            onClick={this.handleBackClick}
          >
            <FontAwesomeIcon className="fa_coins" icon={faCoins} />
            Create More Tokens
          </span>
        </form>
      </div>
    );
  }
}

SuccessMessagePanel.propTypes = {
  infoMessage: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenTypeActions: PropTypes.object.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  tokenOwnerFundsActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired,
  accountsActions: PropTypes.object.isRequired,
  serviceFeeActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    infoMessage: state.infoMessage,
    tokenOwner: state.tokenOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    decimalsActions: bindActionCreators(decimalsActions, dispatch),
    tokenNameActions: bindActionCreators(tokenNameActions, dispatch),
    tokenSymbolActions: bindActionCreators(tokenSymbolActions, dispatch),
    totalSupplyActions: bindActionCreators(totalSupplyActions, dispatch),
    tokenTypeActions: bindActionCreators(tokenTypeActions, dispatch),
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch),
    accountsActions: bindActionCreators(accountsActions, dispatch),
    serviceFeeActions: bindActionCreators(serviceFeeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessMessagePanel);

