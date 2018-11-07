import { h, Component } from 'preact';
import { PageHeader, Logo, ContentField } from './styled';

import LogoPic from '../../../public/img/Logo.svg';
import LogoPicWhite from '../../../public/img/Logo-white.svg';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actualHeight: window.innerHeight,
            initHeight: window.innerHeight
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({
            actualHeight: window.innerHeight
        });
    };

    render({ children, variant }, { actualHeight, initHeight }) {
        return (
            <PageHeader hidden={actualHeight < initHeight}>
                <Logo href="/" alt="POETIC PRAXIS" title="POETIC PRAXIS">
                    <img
                        src={variant === 'light' ? LogoPic : LogoPicWhite}
                        alt="Logo"
                        height="32"
                    />
                </Logo>
                <ContentField>{children}</ContentField>
            </PageHeader>
        );
    }
}
