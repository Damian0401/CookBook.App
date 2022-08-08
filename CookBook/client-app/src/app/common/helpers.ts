
    export const getTagColor = (text: string) => tagColors[text.charCodeAt(0) % tagColors.length]

    const tagColors = [
        'red',
        'green',
        'blue',
        'orange',
        'purple',
        'yellow',
        'teal',
    ]
