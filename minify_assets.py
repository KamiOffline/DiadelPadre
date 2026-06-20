from pathlib import Path
import re
root = Path('.')
assets = {
    'styles.css': 'styles.min.css',
    'script.js': 'script.min.js'
}
for source, target in assets.items():
    content = root.joinpath(source).read_text(encoding='utf-8')
    if source.endswith('.css'):
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.S)
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r' ?([{}:;,]) ?', r'\1', content)
    else:
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.S)
        content = re.sub(r'//.*', '', content)
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r' ?([{}();,:=\[\]+<>]) ?', r'\1', content)
    root.joinpath(target).write_text(content.strip(), encoding='utf-8')
    print(f'Generated {target}')
