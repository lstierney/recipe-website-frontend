import {useGetRandomDinnersQuery} from "../../store/api";
import RecipesList from "../../components/recipe/recipeslist/RecipesList";
import mainClasses from '../../main.module.css';
import Hero from "../../components/hero/Hero";


const HomePage = () => {
    const {data: randomDinners} = useGetRandomDinnersQuery({});

    return (
        <>
            <Hero/>
            <div className={mainClasses['home-previews']}>
                <RecipesList recipes={randomDinners ? randomDinners : []}/>
            </div>

        </>
    );
}

export default HomePage;