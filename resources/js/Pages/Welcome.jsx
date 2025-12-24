import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import Home from '../Components/Home';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
                            <Home />

            {/* <Head title="Welcome" /> */}
            
        </>
    );
}
