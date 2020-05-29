import React, {useState, useEffect} from 'react'
import {FormControl, NativeSelect} from '@material-ui/core'
import {fetchCountries} from '../../api/asynccalls'

import styles from './CountryPicker.module.css'

const CountryPicker = ({handleOnChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(()=>{
        const fetchAPI = async() => {
            setFetchedCountries(await fetchCountries())
        }
        fetchAPI()
    },[])
    console.log(fetchedCountries)
    return(
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect onChange = {(e)=>handleOnChange(e.target.value)}>
                    <option value = "global">Global</option>
                    {fetchedCountries.map((country, index)=><option key = {index} value = {country.name}>{country.name}</option>)}
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default CountryPicker