import type {Expense} from '../types/index'
import {ExpenseItem} from './ExpenseItem'

type ExpenseListProps = {
expenses : Expense[]
}

export function ExpenseList({expenses} : ExpenseListProps){
    return(
        <div className="list">
            {
                expenses.length === 0 ? (<h1>No expenses left...</h1>) : (
                    expenses.map((item)=>(
                        <ExpenseItem key={item.id} expense = {item}/>
                    ))
                )
            }
        </div>
    )
}
