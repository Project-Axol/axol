import React from 'react'

function Category(props) {
  const {category_name} = props.category
  
  return (
    <section className='categories'>{category_name}</section>
  )
}

export default Category