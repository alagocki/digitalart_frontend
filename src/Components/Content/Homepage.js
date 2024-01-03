import React from 'react';
import Header from '../website/Header';

/** ToDo: Add a Header first as Component */
class Homepage extends React.Component {
    render() {
        return (
            <div className="flex flex-col min-h-screen">
                {<Header />}
                {/*<div className="border-2 border-amber-950 flex items-center justify-center">*/}
                {/*    <div className="mt-auto w-1/2 border-2 border-amber-200 flex justify-end">Navigation</div>*/}
                {/*</div>*/}
                {/*<div className="border-2 border-amber-950 flex items-center justify-center">*/}
                {/*    <div className="mt-auto w-1/2 border-2 border-amber-200 flex">Main content</div>*/}
                {/*</div>*/}
                {/*<div className="border-2 border-amber-950 flex items-center justify-center">*/}
                {/*    <div className="mt-auto w-1/2 border-2 border-amber-200 flex">Footer</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Homepage;