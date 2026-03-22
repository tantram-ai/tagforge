import React from 'react'
import { StrategyOverview } from './StrategyOverview'
import { EntitiesToInclude } from './EntitesToInclude'
import { RecommendedSchema } from './RecomendedSchema'
import { EeatRequirements } from './EeatRequirements'
import { SuggestedLinks } from './SuggestedLinks'

export const StrategyTab = () => {
    return (
        <>
            <StrategyOverview />
            <EntitiesToInclude />
            <RecommendedSchema/>
            <EeatRequirements/>
            <SuggestedLinks/>
        </>

    )
}
