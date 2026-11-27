import type {CategoryType} from '../types/index'

type CategoryFilterProps = {
    onDropDown : (val : CategoryType) => void
}

export function CategoryFilter({onDropDown} : CategoryFilterProps){
    return(
        <div>
            <select name="category" onChange={(e)=>onDropDown(e.target.value as CategoryType)}>
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>
        </div>
    )
}