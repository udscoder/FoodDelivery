export function scrollToPage(id: string, block: any) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ block: block, behavior: 'smooth' });
    }
}