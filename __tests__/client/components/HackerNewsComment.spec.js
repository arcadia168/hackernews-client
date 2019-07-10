import React from 'react';
import HackerNewsComment from '../../../src/client/components/HackerNewsComment';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('App', () => {
    const render = customProps => {
        const props = {
            // Default props
            ...customProps,
        }
        return mount(<App {...props} />);
    }

    it('renders the app as expected', () => {
        const testCommentDetails = {
            "by": "norvig",
            "id": 2921983,
            "kids": [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
            "parent": 2921506,
            "text": "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
            "time": 1314211127,
            "type": "comment"
        }
        const component = renderer.create(
            <HackerNewsComment commentDetails={testCommentDetails} />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

