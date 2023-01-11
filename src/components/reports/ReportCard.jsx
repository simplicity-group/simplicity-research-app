import React from 'react'
import { NavLink } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'

const ReportCard = (props) => {

    return (
    <NavLink to='/specificreport'>
        <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-300 hover:shadow-md hover:border-gray-400">
            <div class="px-4 py-3 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">{props.name}</h3>
            </div>
            <div class="border-t border-gray-200 grid grid-cols-2">
                <div class="px-4 py-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Summary</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    <TextTruncate
                        line={5}
                        element="p"
                        truncateText="…"
                        text={props.summary}
                    />
                    </dd>
                </div>
                <div>
                    <dl>
                    <div class="px-4 py-3 grid sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Rating</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{props.rating}</dd>
                    </div>
                    <div class=" px-4 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Some Metric</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{props.someMetric1}</dd>
                    </div>
                    <div class="px-4 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Some Metric</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{props.someMetric2}</dd>
                    </div>
                    </dl>
                </div>
            </div>
        </div>
    </NavLink>
    )
}

export default ReportCard
