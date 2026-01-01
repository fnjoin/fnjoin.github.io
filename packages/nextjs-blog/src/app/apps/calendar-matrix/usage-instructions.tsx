import React from "react";

export const UsageInstructions: React.FC = () => {
    return (
        <>
            <div
                id="usage-instructions"
                className="mt-6 p-4 bg-blue-50 rounded-lg"
            >
                <h3 className="font-semibold text-gray-800 mb-2">
                    How to use:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                        • <strong>Multiple Calendars:</strong> Create separate
                        calendars for different projects, years, or planning
                        purposes
                    </li>
                    <li>
                        • <strong>Share Calendar:</strong> Generate a shareable
                        link to send your calendar to others - they can import
                        it to their browser
                    </li>
                    <li>
                        • <strong>Year:</strong> Select any year to view all
                        365/366 days at once
                    </li>
                    <li>
                        • <strong>Days per Row:</strong> Control the matrix
                        layout (7 = weekly, 14 = biweekly, 91 = quarterly)
                    </li>
                    <li>
                        • <strong>Date Selection:</strong> Click and drag across
                        days to select a date range (e.g., Jan 15-25)
                    </li>
                    <li>
                        • <strong>Matrix Selection:</strong> Hold Shift and drag
                        to select by matrix position (e.g., 4 Mondays in a row
                        when using 7 days/row)
                    </li>
                    <li>
                        • <strong>Row/Column Highlights:</strong> Hover over day
                        names or row edges to see + buttons for full column/row
                        highlights
                    </li>
                    <li>
                        • <strong>Comments:</strong> Add notes to any highlight
                        and change its color
                    </li>
                    <li>
                        • <strong>Auto-Save:</strong> Each calendar is
                        automatically saved to your browser and restored when
                        you reload the page
                    </li>
                    <li>
                        • <strong>Copy to Clipboard:</strong> Export your
                        calendar as an HTML table that pastes into Google Docs,
                        maintaining colors and comments
                    </li>
                </ul>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                    Privacy & Data FAQ:
                </h3>
                <div className="text-sm text-gray-600 space-y-3">
                    <div>
                        <strong className="text-gray-700">
                            Q: Where is my calendar data stored?
                        </strong>
                        <p>
                            A: All calendar data is stored locally in your
                            browser&apos;s localStorage. Nothing is sent to or
                            stored on external servers.
                        </p>
                    </div>
                    <div>
                        <strong className="text-gray-700">
                            Q: Who has access to my calendars?
                        </strong>
                        <p>
                            A: Only you have access to your calendars. The data
                            never leaves your device unless you explicitly share
                            a calendar using the share feature.
                        </p>
                    </div>
                    <div>
                        <strong className="text-gray-700">
                            Q: How long is my data retained?
                        </strong>
                        <p>
                            A: Your calendars are stored indefinitely in your
                            browser until you clear your browser data or delete
                            the calendars manually. No automatic deletion
                            occurs.
                        </p>
                    </div>
                    <div>
                        <strong className="text-gray-700">
                            Q: How does sharing work?
                        </strong>
                        <p>
                            A: When you click &quot;Share Calendar,&quot; it
                            creates a URL containing your calendar data. Anyone
                            with this link can view and import your calendar to
                            their browser. Only share links with people you
                            trust.
                        </p>
                    </div>
                    <div>
                        <strong className="text-gray-700">
                            Q: What happens if I clear my browser data?
                        </strong>
                        <p>
                            A: All your calendars will be permanently lost.
                            Consider using the share feature to backup important
                            calendars before clearing browser data.
                        </p>
                    </div>
                    <div>
                        <strong className="text-gray-700">
                            Q: Can I use this across multiple devices?
                        </strong>
                        <p>
                            A: Each device stores its own calendar data. To sync
                            calendars between devices, use the share feature to
                            transfer calendars via the generated links.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
